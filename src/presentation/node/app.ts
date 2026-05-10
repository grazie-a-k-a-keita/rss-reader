import { DuckDBInstance } from "@duckdb/node-api";
import { DailyBatchService } from "../../application/dailyBatch/dailyBatchService.js";
import { config } from "../../config/config.js";
import { DiscordNotifyManager } from "../../infrastructure/discord/discordNotifyManager/discordNotifyManager.js";
import { RssFeedRepository } from "../../infrastructure/rss/rssFeedRepository/rssFeedRepository.js";
import { S3ExceptKeywordRepository } from "../../infrastructure/s3/s3ExceptKeywordRepository/s3ExceptKeywordRepository.js";
import { S3HistoryRepository } from "../../infrastructure/s3/s3HistoryRepository/s3HistoryRepository.js";
import { S3TargetRepository } from "../../infrastructure/s3/s3TargetRepository/s3TargetRepository.js";

export async function app() {
	const instance = await DuckDBInstance.create(":memory:");
	const connection = await instance.connect();
	await connection.run(`INSTALL httpfs;`);
	await connection.run(`LOAD httpfs;`);
	await connection.run(`CREATE OR REPLACE SECRET secret (TYPE s3, PROVIDER credential_chain);`);

	const dailyBatchService = new DailyBatchService(
		new S3ExceptKeywordRepository(connection, config.s3.bucketName),
		new S3TargetRepository(connection, config.s3.bucketName),
		new S3HistoryRepository(connection, config.s3.bucketName),
		new RssFeedRepository(),
		new DiscordNotifyManager(config.discordWebhookUrl),
	);

	await dailyBatchService.execute();

	connection.closeSync();
	instance.closeSync();
}
