import { describe, expect, test } from "vitest";
import { Title } from "./title.js";

describe("Title", () => {
	test("Titleクラスのインスタンスを作成できること", () => {
		const title = new Title("恐竜のニュース");
		expect(title.value).toBe("恐竜のニュース");
	});
});
