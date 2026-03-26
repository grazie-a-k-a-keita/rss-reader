import dayjs from "dayjs";
import { FeedList } from "../model/feedList.js";
import { History } from "../model/history.js";
import type { ExceptKeywordRepository } from "../repository/exceptKeywordRepository.js";
import type { HistoriesRepository } from "../repository/historiesRepository.js";
import type { TargetsRepository } from "../repository/targetsRepository.js";
import type { IFetchFeedService } from "./fetchFeedService.js";
import type { INotifyService } from "./notifyService.js";

export class GetInformationService {
	public constructor(
		private readonly exceptKeywordRepository: ExceptKeywordRepository,
		private readonly targetsRepository: TargetsRepository,
		private readonly historiesRepository: HistoriesRepository,
		private readonly fetchFeedService: IFetchFeedService,
		private readonly notifyService: INotifyService,
	) {}

	public async execute() {
		// 有効期限切れの履歴を一括で削除
		await this.historiesRepository.deleteExpiredHistories();

		// 対象と履歴と除外キーワードを取得
		const targets = await this.targetsRepository.findAll();
		const histories = await this.historiesRepository.findAll();
		const keywords = await this.exceptKeywordRepository.getKeywords();

		// 対象ごとに処理
		for (const target of targets) {
			// フィードを取得
			const feeds = await this.fetchFeedService.execute(target);

			// 履歴に存在する通知済みのフィードと、タイトルに特定のキーワードを含むフィードを除外
			const newFeeds = new FeedList(feeds)
				.filterHistories(histories)
				.filterByKeywords(keywords);

			// 新規フィードを通知
			for (const feed of newFeeds.feeds) {
				// 1秒おきに通知する（DiscordのWebhookのレートリミット対策）
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await this.notifyService.execute({ content: feed.toNotifyMessage() });
			}

			// 通知した新規フィードを履歴に追加
			await this.historiesRepository.bulkInsertNewHistories(
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
