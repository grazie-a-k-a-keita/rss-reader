import fs from "node:fs";

export interface ExceptKeywordRepository {
	getKeywords(): Promise<string[]>;
}

export class FileExceptKeywordRepository implements ExceptKeywordRepository {
	private readonly PATH: fs.PathOrFileDescriptor = new URL(
		"../data/exceptKeyword.txt",
		import.meta.url,
	);

	public async getKeywords(): Promise<string[]> {
		return fs
			.readFileSync(this.PATH, "utf-8")
			.split("\n")
			.map((k) => k.trim())
			.filter((k) => k.length > 0);
	}
}

export class InMemoryExceptKeywordRepository
	implements ExceptKeywordRepository
{
	public constructor(private keywords: string[] = []) {}

	public async getKeywords(): Promise<string[]> {
		return this.keywords;
	}
}
