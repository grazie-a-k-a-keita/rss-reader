import { describe, expect, test } from "vitest";
import { Expire } from "./expire.js";

describe("Expire", () => {
	test("未来の日付でインスタンスを作成できること", () => {
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		const expire = new Expire(futureDate);

		expect(expire.value).toBe(futureDate);
	});

	test("過去の日付でインスタンスを作成しようとするとエラーが発生すること", () => {
		const pastDate = new Date();
		pastDate.setDate(pastDate.getDate() - 1);

		expect(() => new Expire(pastDate)).toThrow("Expire date cannot be in the past");
	});

	describe("addDays()", () => {
		test("指定した日数を加算したExpireインスタンスを返すこと", () => {
			const futureDate = new Date();
			futureDate.setDate(futureDate.getDate() + 1);
			const expire = new Expire(futureDate);

			const newExpire = expire.addDays(5);
			const expectedDate = new Date(futureDate);
			expectedDate.setDate(expectedDate.getDate() + 5);

			expect(newExpire.value).toEqual(expectedDate);
		});
	});
});
