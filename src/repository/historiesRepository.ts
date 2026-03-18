import fs from "node:fs";
import dayjs from "dayjs";
import { History } from "../model/history.js";

export interface HistoriesRepository {
	findAll(): Promise<History[]>;
	deleteExpiredHistories(): Promise<void>;
	bulkInsertNewHistories(histories: History[]): Promise<void>;
}

export class CsvHistoriesRepository implements HistoriesRepository {
	private readonly HEADERS = "target_title,title,expire_date";
	private readonly PATH: fs.PathOrFileDescriptor = new URL(
		"../data/histories.csv",
		import.meta.url,
	);

	public async findAll(): Promise<History[]> {
		return this.readAll();
	}

	public async deleteExpiredHistories(): Promise<void> {
		const existingHistories = this.readAll();

		const nonExpiredHistories = existingHistories.filter((history) =>
			dayjs(history.expireDate).isAfter(dayjs()),
		);

		this.writeAll(nonExpiredHistories);
	}

	public async bulkInsertNewHistories(newHistories: History[]): Promise<void> {
		const existingHistories = this.readAll();

		this.writeAll([...existingHistories, ...newHistories]);
	}

	private readAll(): History[] {
		return fs
			.readFileSync(this.PATH, "utf8")
			.split("\n")
			.slice(1)
			.filter((line) => line.trim() !== "")
			.map((line) => {
				const values = line.split(",");
				return new History(values[0], values[1], dayjs(values[2]).toDate());
			});
	}

	private writeAll(histories: History[]): void {
		const lines = [
			this.HEADERS,
			...histories.map(
				(history) =>
					`${history.targetTitle},${history.title},${dayjs(history.expireDate).format("YYYY-MM-DD")}`,
			),
		];

		fs.writeFileSync(this.PATH, lines.join("\n"));
	}
}
