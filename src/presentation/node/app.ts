import "dotenv/config";
import { DailyBatchService } from "../../application/dailyBatch/dailyBatchService.js";
import { config } from "../../config/config.js";
import { DiscordNotifyManager } from "../../infrastructure/discord/discordNotifyManager/discordNotifyManager.js";
import { LocalExceptKeywordRepository } from "../../infrastructure/local/localExceptKeywordRepository/localExceptKeywordRepository.js";
import { LocalHistoryRepository } from "../../infrastructure/local/localHistoryRepository/localHistoryRepository.js";
import { LocalTargetRepository } from "../../infrastructure/local/localTargetRepository/localTargetRepository.js";
import { RssFeedRepository } from "../../infrastructure/rss/rssFeedRepository/rssFeedRepository.js";

export async function app() {
	const dailyBatchService = new DailyBatchService(
		new LocalExceptKeywordRepository(),
		new LocalTargetRepository(),
		new LocalHistoryRepository(),
		new RssFeedRepository(),
		new DiscordNotifyManager(config.discordWebhookUrl),
	);

	await dailyBatchService.execute();
}
