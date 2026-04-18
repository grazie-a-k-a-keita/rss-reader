import { describe, expect, test } from "vitest";
import { Retention } from "./retention.js";

describe("Retention", () => {
	test("保持期間が90日以下の場合、インスタンスを作成できること", () => {
		const retention = new Retention(30);
		expect(retention.value).toBe(30);
	});

	test("保持期間が90日を超える場合、エラーが発生すること", () => {
		expect(() => new Retention(91)).toThrow("Retention must be less than or equal to 90 days");
	});

	test("保持期間が0日未満の場合、エラーが発生すること", () => {
		expect(() => new Retention(-1)).toThrow("Retention must be greater than or equal to 0 days");
	});
});
