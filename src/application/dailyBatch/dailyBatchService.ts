import type { ExceptKeywordRepository } from "../../domain/models/exceptKeyword/exceptKeywordRepository.js";
import type { FeedRepository } from "../../domain/models/feed/feedRepository.js";
import type { HistoryRepository } from "../../domain/models/history/historyRepository.js";
import type { TargetRepository } from "../../domain/models/target/targetRepository.js";
import { FilterFeedDomainService } from "../../domain/services/filterFeedDomainService/filterFeedDomainService.js";
import { TransferModelDomainService } from "../../domain/services/transferModelDomainService/transferModelDomainService.js";
import type { NotifyManager } from "../shared/notifyManager.js";

export class DailyBatchService {
	private readonly filterFeedDomainService = new FilterFeedDomainService();
	private readonly transferModelDomainService = new TransferModelDomainService();

	public constructor(
		private readonly exceptKeywordRepository: ExceptKeywordRepository,
		private readonly targetRepository: TargetRepository,
		private readonly historyRepository: HistoryRepository,
		private readonly feedRepository: FeedRepository,
		private readonly notifyManager: NotifyManager,
	) {}

	public async execute() {
		// 有効期限切れの履歴を一括で削除
		await this.historyRepository.deleteExpired();

		// 対象と履歴と除外キーワードを取得
		const targets = await this.targetRepository.findAll();
		const histories = await this.historyRepository.findAll();
		const exceptKeywords = await this.exceptKeywordRepository.findAll();

		// 対象ごとに処理
		for (const target of targets) {
			// フィードを取得
			const feeds = await this.feedRepository.fetch(target.url);

			// 履歴に存在する通知済みのフィードと、タイトルに特定のキーワードを含むフィードを除外
			const newFeeds = this.filterFeedDomainService.filter(targets, feeds, histories, exceptKeywords);

			// 新規フィードを通知
			for (const feed of newFeeds) {
				// 1秒おきに通知する（DiscordのWebhookのレートリミット対策）
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await this.notifyManager.send(target, feed);
			}

			// 通知した新規フィードを履歴に追加
			await this.historyRepository.saveNewHistories(this.transferModelDomainService.toHistory(target, newFeeds));
		}
	}
}
