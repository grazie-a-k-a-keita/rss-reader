import "dotenv/config";
import { CsvHistoriesRepository } from "./repository/historiesRepository.js";
import { CsvTargetsRepository } from "./repository/targetsRepository.js";
import { GetInformationService } from "./service/getInformationService.js";
import { NotifyService } from "./service/notifyService.js";

const fetchRssService = new GetInformationService(
	new CsvTargetsRepository(),
	new CsvHistoriesRepository(),
	new NotifyService(process.env.DISCORD_WEBHOOK_URL || ""),
);

try {
	await fetchRssService.execute();
} catch (error) {
	console.error(error);
}
