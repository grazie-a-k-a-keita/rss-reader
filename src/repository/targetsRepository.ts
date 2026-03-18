import fs from "node:fs";
import { Target } from "../model/target.js";

export interface TargetsRepository {
	findAll(): Promise<Target[]>;
}

export class CsvTargetsRepository implements TargetsRepository {
	private readonly PATH: fs.PathOrFileDescriptor = new URL(
		"../data/targets.csv",
		import.meta.url,
	);

	public async findAll(): Promise<Target[]> {
		return this.readAll();
	}

	private readAll(): Target[] {
		const result = fs
			.readFileSync(this.PATH, "utf8")
			.split("\n")
			.slice(1)
			.filter((line) => line.trim() !== "")
			.map((line) => {
				const values = line.split(",");
				return Target.create(
					values[0],
					values[1],
					values[2],
					Number(values[3]),
				);
			});

		return result;
	}
}
