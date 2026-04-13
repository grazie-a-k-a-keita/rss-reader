import { describe, expect, test } from "vitest";
import { Url } from "./url.js";

describe("URL", () => {
	test("有効なURLでインスタンスを作成できること", () => {
		const url = new Url("https://example.com");
		expect(url.value).toBe("https://example.com");
	});

	test("無効なURLでインスタンスを作成しようとするとエラーが発生すること", () => {
		expect(() => new Url("invalid-url")).toThrow("URL is invalid");
	});
});
