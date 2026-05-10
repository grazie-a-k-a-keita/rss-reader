import type { DuckDBConnection } from "@duckdb/node-api";
import { Character } from "../../../domain/models/exceptKeyword/character/character.js";
import { ExceptKeyword } from "../../../domain/models/exceptKeyword/exceptKeyword.js";
import type { ExceptKeywordRepository } from "../../../domain/models/exceptKeyword/exceptKeywordRepository.js";

export class S3ExceptKeywordRepository implements ExceptKeywordRepository {
	public constructor(
		private readonly connection: DuckDBConnection,
		private readonly bucketName: string,
	) {}

	public async findAll(): Promise<ExceptKeyword[]> {
		const reader = await this.connection.run(`
			SELECT *
			FROM read_csv_auto('s3://${this.bucketName}/except-keywords.csv');
		`);

		const rows = await reader.getRowObjectsJson();

		return rows.map(({ keyword }) => this.toDomain(String(keyword)));
	}

	private toDomain(character: string): ExceptKeyword {
		return ExceptKeyword.create(new Character(character));
	}
}
