import "dotenv/config";
import { FileExceptKeywordRepository } from "./repository/exceptKeywordRepository.js";
import { CsvHistoriesRepository } from "./repository/historiesRepository.js";
import { CsvTargetsRepository } from "./repository/targetsRepository.js";
import { FetchFeedService } from "./service/fetchFeedService.js";
import { GetInformationService } from "./service/getInformationService.js";
import { NotifyService } from "./service/notifyService.js";

const fetchRssService = new GetInformationService(
	new FileExceptKeywordRepository(),
	new CsvTargetsRepository(),
	new CsvHistoriesRepository(),
	new FetchFeedService(),
	new NotifyService(process.env.DISCORD_WEBHOOK_URL || ""),
);

try {
	await fetchRssService.execute();
} catch (error) {
	console.error(error);
}
