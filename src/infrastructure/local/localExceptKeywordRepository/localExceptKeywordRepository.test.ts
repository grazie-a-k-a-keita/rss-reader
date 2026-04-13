import { beforeEach, describe, expect, test } from "vitest";
import type { ExceptKeywordRepository } from "../../../domain/models/exceptKeyword/exceptKeywordRepository.js";
import { LocalExceptKeywordRepository } from "./localExceptKeywordRepository.js";

describe("LocalExceptKeywordRepository", () => {
	let exceptKeywordRepository: ExceptKeywordRepository;

	beforeEach(() => {
		exceptKeywordRepository = new LocalExceptKeywordRepository(
			"test/exceptKeyword.txt",
		);
	});

	test("findAll()", async () => {
		const exceptKeywords = await exceptKeywordRepository.findAll();

		expect(exceptKeywords[0].character.value).toBe("claude");
		expect(exceptKeywords[1].character.value).toBe("copilot");
	});
});
