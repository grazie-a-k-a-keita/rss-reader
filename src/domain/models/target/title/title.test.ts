import { describe, expect, test } from "vitest";
import { Title } from "./title.js";

describe("Title", () => {
	test("1文字以上100文字以下のタイトルでインスタンスを作成できること", () => {
		const title = new Title("ニュース");
		expect(title.value).toBe("ニュース");
	});

	test("100文字を超えるタイトルでインスタンスを作成しようとするとエラーが発生すること", () => {
		const longTitle = "a".repeat(101);
		expect(() => new Title(longTitle)).toThrow(`Title must be less than or equal to 100 characters`);
	});

	test("1文字未満のタイトルでインスタンスを作成しようとするとエラーが発生すること", () => {
		expect(() => new Title("")).toThrow(`Title must be greater than or equal to 1 characters`);
	});
});
