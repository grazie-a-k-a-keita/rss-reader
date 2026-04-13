import { describe, expect, test } from "vitest";
import { Emoji } from "./emoji.js";

describe("Emoji", () => {
	test("1文字の絵文字でインスタンスを作成できること", () => {
		const emoji = new Emoji("📚");
		expect(emoji.value).toBe("📚");
	});

	test("2文字以上の絵文字でインスタンスを作成しようとするとエラーが発生すること", () => {
		expect(() => new Emoji("📚📚")).toThrow("Emoji must be a single character");
	});
});
