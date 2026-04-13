import { describe, expect, test } from "vitest";
import { Category } from "./category.js";

describe("Category", () => {
	test("Categoryクラスのインスタンスを作成できること", () => {
		const category = new Category("オライリーの新刊・近刊情報");
		expect(category.value).toBe("オライリーの新刊・近刊情報");
	});
});
