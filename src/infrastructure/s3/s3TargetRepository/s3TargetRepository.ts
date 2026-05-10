import type { DuckDBConnection } from "@duckdb/node-api";
import { Emoji } from "../../../domain/models/target/emoji/emoji.js";
import { Retention } from "../../../domain/models/target/retention/retention.js";
import { Target } from "../../../domain/models/target/target.js";
import type { TargetRepository } from "../../../domain/models/target/targetRepository.js";
import { Title } from "../../../domain/models/target/title/title.js";
import { Url } from "../../../domain/models/target/url/url.js";

export class S3TargetRepository implements TargetRepository {
	public constructor(
		private readonly connection: DuckDBConnection,
		private readonly bucketName: string,
	) {}

	public async findAll(): Promise<Target[]> {
		const reader = await this.connection.run(`
			SELECT *
			FROM read_csv_auto('s3://${this.bucketName}/targets.csv');
		`);

		const rows = await reader.getRowObjectsJson();

		return rows.map(({ emoji, title, url, retention }) =>
			this.toDomain(String(emoji), String(title), String(url), Number(retention)),
		);
	}

	private toDomain(emoji: string, title: string, url: string, retention: number): Target {
		return Target.create(new Emoji(emoji), new Title(title), new Url(url), new Retention(retention));
	}
}
