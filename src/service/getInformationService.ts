import dayjs from "dayjs";
import { parseFeed } from "feedsmith";
import { Feed } from "../model/feed.js";
import { FeedList } from "../model/feedList.js";
import { History } from "../model/history.js";
import type { HistoriesRepository } from "../repository/historiesRepository.js";
import type { TargetsRepository } from "../repository/targetsRepository.js";
import type { NotifyService } from "./notifyService.js";

export class GetInformationService {
	public constructor(
		public readonly targetsRepository: TargetsRepository,
		public readonly historiesRepository: HistoriesRepository,
		public readonly notifyService: NotifyService,
	) {}

	public async execute() {
		// 有効期限切れの履歴を一括で削除
		await this.historiesRepository.deleteExpiredHistories();

		// 対象と履歴を取得
		const targets = await this.targetsRepository.findAll();
		const histories = await this.historiesRepository.findAll();

		// 対象ごとに処理
		for (const target of targets) {
			// フィードを取得
			const feeds = await fetch(target.url)
				.then((response) => response.text())
				.then((text) => {
					const { format, feed } = parseFeed(text);

					if (format !== "rdf" && format !== "rss") {
						throw new Error(
							`Unsupported feed format: ${format}, URL: ${target.url}`,
						);
					}

					return (feed.items ?? []).map(
						(item) => new Feed(item.title ?? "", item.link ?? "", target),
					);
				});

			// 履歴に存在する通知済みのフィードと、タイトルに特定のキーワードを含むフィードを除外
			const newFeeds = new FeedList(feeds)
				.filterHistories(histories)
				.filterByKeywords(["claude", "copilot", "codex", "ai"]);

			// 新規フィードを通知
			for (const feed of newFeeds.feeds) {
				// 1秒おきに通知する（DiscordのWebhookのレートリミット対策）
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await this.notifyService.execute({ content: feed.toNotifyMessage() });
			}

			// 通知した新規フィードを履歴に追加
			this.historiesRepository.bulkInsertNewHistories(
				newFeeds.feeds.map(
					(feed) =>
						new History(
							feed.target.title,
							feed.title,
							dayjs().add(feed.target.retention, "day").toDate(),
						),
				),
			);
		}

		console.info("Information retrieval completed✨");
	}
}
