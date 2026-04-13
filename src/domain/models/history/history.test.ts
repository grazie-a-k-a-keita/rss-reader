import { describe, expect, test } from "vitest";
import { Category } from "./category/category.js";
import { Expire } from "./expire/expire.js";
import { History } from "./history.js";
import { Title } from "./title/title.js";

describe("History", () => {
	test("Historyクラスのインスタンスを作成できること", () => {
		const futureDate = new Date();
		futureDate.setDate(futureDate.getDate() + 1);
		const history = History.create(
			new Category("新刊情報"),
			new Title("新しい記事"),
			new Expire(futureDate),
		);

		expect(history.category.value).toBe("新刊情報");
		expect(history.title.value).toBe("新しい記事");
		expect(history.expire.value).toEqual(futureDate);
	});
});
