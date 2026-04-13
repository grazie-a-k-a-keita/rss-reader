import "dotenv/config";
import { DailyBatchService } from "../../application/dailyBatch/dailyBatchService.js";
import { config } from "../../config/config.js";
import { DiscordNotifyManager } from "../../infrastructure/discord/discordNotifyManager/discordNotifyManager.js";
import { LocalExceptKeywordRepository } from "../../infrastructure/local/localExceptKeywordRepository/localExceptKeywordRepository.js";
import { LocalHistoryRepository } from "../../infrastructure/local/localHistoryRepository/localHistoryRepository.js";
import { LocalTargetRepository } from "../../infrastructure/local/localTargetRepository/localTargetRepository.js";
import { RssFeedRepository } from "../../infrastructure/rss/rssFeedRepository/rssFeedRepository.js";

async function main() {
	const dailyBatchService = new DailyBatchService(
		new LocalExceptKeywordRepository(),
		new LocalTargetRepository(),
		new LocalHistoryRepository(),
		new RssFeedRepository(),
		new DiscordNotifyManager(config.discordWebhookUrl),
	);

	await dailyBatchService.execute();
}

main()
	.then(async () => {
		console.log("Daily batch process completed successfully.");
	})
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	});
