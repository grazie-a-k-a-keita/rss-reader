import { describe, expect, test } from "vitest";
import { Character } from "./character.js";

describe("Character", () => {
	test("文字列が1文字の場合、Characterクラスのインスタンスを作成できること", () => {
		const char = new Character("A");
		expect(char.value).toBe("A");
	});

	test("文字列が31文字以上の場合、Characterクラスのインスタンスを作成しようとするとエラーが発生すること", () => {
		expect(() => new Character("A".repeat(31))).toThrow("Character must be less than or equal to 30 characters");
	});

	test("空文字の場合、Characterクラスのインスタンスを作成しようとするとエラーが発生すること", () => {
		expect(() => new Character("")).toThrow("Character must be greater than or equal to 1 characters");
	});
});
