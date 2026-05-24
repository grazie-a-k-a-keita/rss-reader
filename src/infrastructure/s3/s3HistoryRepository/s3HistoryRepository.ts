import type { DuckDBConnection } from "@duckdb/node-api";
import dayjs from "dayjs";
import { Category } from "../../../domain/models/history/category/category.js";
import { Expire } from "../../../domain/models/history/expire/expire.js";
import { History } from "../../../domain/models/history/history.js";
import type { HistoryRepository } from "../../../domain/models/history/historyRepository.js";
import { Title } from "../../../domain/models/history/title/title.js";

export class S3HistoryRepository implements HistoryRepository {
	public constructor(
		private readonly connection: DuckDBConnection,
		private readonly bucketName: string,
	) {}

	public async findAll(): Promise<History[]> {
		const reader = await this.connection.run(`
			SELECT *
			FROM read_csv_auto('s3://${this.bucketName}/histories.csv');
		`);

		const rows = await reader.getRowObjectsJson();

		return rows.map(({ target_title, title, expire_date }) =>
			this.toDomain(String(target_title), String(title), dayjs(String(expire_date)).toDate()),
		);
	}

	public async deleteExpired(): Promise<void> {
		const existingHistories = await this.findAll();
		const nonExpiredHistories = existingHistories.filter((history) => dayjs(history.expire.value).isAfter(dayjs()));

		if (nonExpiredHistories.length === existingHistories.length) return;

		await this.writeAll(nonExpiredHistories);
	}

	public async saveNewHistories(newHistories: History[]): Promise<void> {
		if (newHistories.length === 0) return;

		const existingHistories = await this.findAll();
		await this.writeAll([...existingHistories, ...newHistories]);
	}

	/** S3オブジェクトに上書きする */
	private async writeAll(histories: History[]): Promise<void> {
		await this.connection.run(
			`CREATE OR REPLACE TEMP TABLE temp_histories (target_title VARCHAR, title VARCHAR, expire_date DATE);`,
		);

		if (histories.length > 0) {
			const values = histories
				.map(
					(h) =>
						`('${this.escape(h.category.value)}', '${this.escape(h.title.value)}', '${dayjs(h.expire.value).format("YYYY-MM-DD")}')`,
				)
				.join(",");

			await this.connection.run(`INSERT INTO temp_histories VALUES ${values};`);
		}

		await this.connection.run(`
			COPY temp_histories
			TO 's3://${this.bucketName}/histories.csv' (FORMAT CSV, HEADER);
		`);

		await this.connection.run(`DROP TABLE temp_histories;`);
	}

	private toDomain(targetTitle: string, title: string, expireDate: Date): History {
		return History.create(new Category(targetTitle), new Title(title), new Expire(expireDate));
	}

	private escape(str: string) {
		return str.replace(/'/g, "");
	}
}
