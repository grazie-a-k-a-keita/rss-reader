import { describe, expect, test } from "vitest";
import { Link } from "./link.js";

describe("Link", () => {
	test("Linkクラスのインスタンスを作成できること", () => {
		const link = new Link("https://example.com");
		expect(link.value).toBe("https://example.com");
	});

	test("URLの形式が正しくない場合、エラーが発生すること", () => {
		expect(() => new Link("invalid-url")).toThrow("Invalid URL format");
	});
});
