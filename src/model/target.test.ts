import { describe, expect, test } from "vitest";
import { Target } from "./target.js";

describe("Target", () => {
	test("create with invalid URL", () => {
		expect(() => Target.create("📚", "タイトル", "invalid-url", 30)).toThrow(
			"URL is invalid",
		);
	});
});
