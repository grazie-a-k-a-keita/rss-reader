import fs from "node:fs";
import { Character } from "../../../domain/models/exceptKeyword/character/character.js";
import { ExceptKeyword } from "../../../domain/models/exceptKeyword/exceptKeyword.js";
import type { ExceptKeywordRepository } from "../../../domain/models/exceptKeyword/exceptKeywordRepository.js";

export class LocalExceptKeywordRepository implements ExceptKeywordRepository {
	private url: URL;

	public constructor(fileName = "exceptKeyword.txt") {
		this.url = new URL(`../../../data/${fileName}`, import.meta.url);
	}

	public async findAll(): Promise<ExceptKeyword[]> {
		return fs
			.readFileSync(this.url, "utf-8")
			.split("\n")
			.map((k) => k.trim())
			.filter((k) => k.length > 0)
			.map((k) => this.toDomain(k));
	}

	private toDomain(character: string): ExceptKeyword {
		return ExceptKeyword.create(new Character(character));
	}
}
