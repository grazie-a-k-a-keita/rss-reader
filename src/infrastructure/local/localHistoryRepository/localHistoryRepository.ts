import fs from "node:fs";
import dayjs from "dayjs";
import { Category } from "../../../domain/models/history/category/category.js";
import { Expire } from "../../../domain/models/history/expire/expire.js";
import { History } from "../../../domain/models/history/history.js";
import type { HistoryRepository } from "../../../domain/models/history/historyRepository.js";
import { Title } from "../../../domain/models/history/title/title.js";

export class LocalHistoryRepository implements HistoryRepository {
	private readonly HEADERS = "target_title,title,expire_date";

	private url: URL;

	public constructor() {
		this.url = new URL("../../../data/histories.csv", import.meta.url);
	}

	public async findAll(): Promise<History[]> {
		return this.readAll();
	}

	public async deleteExpired(): Promise<void> {
		const existingHistories = this.readAll();

		const nonExpiredHistories = existingHistories.filter((history) =>
			dayjs(history.expire.value).isAfter(dayjs()),
		);

		this.writeAll(nonExpiredHistories);
	}

	public async saveHistories(newHistories: History[]): Promise<void> {
		const existingHistories = this.readAll();

		this.writeAll([...existingHistories, ...newHistories]);
	}

	private readAll(): History[] {
		return fs
			.readFileSync(this.url, "utf8")
			.split("\n")
			.slice(1)
			.filter((line) => line.trim() !== "")
			.map((line) => {
				const values = line.split(",");
				return this.toDomain(values[0], values[1], dayjs(values[2]).toDate());
			});
	}

	private writeAll(histories: History[]): void {
		const lines = [
			this.HEADERS,
			...histories.map(
				(history) =>
					`${history.category.value},${history.title.value},${dayjs(history.expire.value).format("YYYY-MM-DD")}`,
			),
		];

		fs.writeFileSync(this.url, lines.join("\n"));
	}

	private toDomain(
		targetTitle: string,
		title: string,
		expireDate: Date,
	): History {
		return History.create(
			new Category(targetTitle),
			new Title(title),
			new Expire(expireDate),
		);
	}
}
