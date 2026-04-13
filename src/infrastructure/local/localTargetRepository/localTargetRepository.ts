import fs from "node:fs";
import { Emoji } from "../../../domain/models/target/emoji/emoji.js";
import { Retention } from "../../../domain/models/target/retention/retention.js";
import { Target } from "../../../domain/models/target/target.js";
import type { TargetRepository } from "../../../domain/models/target/targetRepository.js";
import { Title } from "../../../domain/models/target/title/title.js";
import { Url } from "../../../domain/models/target/url/url.js";

export class LocalTargetRepository implements TargetRepository {
	private url: URL;

	public constructor() {
		this.url = new URL("../../../data/targets.csv", import.meta.url);
	}

	public async findAll(): Promise<Target[]> {
		return this.readAll().map(([emoji, title, url, retention]) =>
			this.toDomain(emoji, title, url, Number(retention)),
		);
	}

	private readAll(): string[][] {
		return fs
			.readFileSync(this.url, "utf8")
			.split("\n")
			.slice(1)
			.filter((line) => line.trim() !== "")
			.map((line) => line.split(","));
	}

	private toDomain(
		emoji: string,
		title: string,
		url: string,
		retention: number,
	): Target {
		return Target.create(
			new Emoji(emoji),
			new Title(title),
			new Url(url),
			new Retention(retention),
		);
	}
}
