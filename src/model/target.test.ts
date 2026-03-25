import { describe, expect, test } from "vitest";
import { Target } from "./target.js";

describe("Target", () => {
	test("不正なURLで通知対象を作成しようとするとエラーが発生すること", () => {
		expect(() => Target.create("📚", "タイトル", "invalid-url", 30)).toThrow(
			"URL is invalid",
		);
	});
});
