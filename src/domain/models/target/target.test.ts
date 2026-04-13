import { describe, expect, test } from "vitest";
import { Emoji } from "./emoji/emoji.js";
import { Retention } from "./retention/retention.js";
import { Target } from "./target.js";
import { Title } from "./title/title.js";
import { Url } from "./url/url.js";

describe("Target", () => {
	const emoji = new Emoji("📚");
	const title = new Title("新刊情報");
	const url = new Url("https://example.com");
	const retention = new Retention(30);

	test("Targetクラスのインスタンスを作成できること", () => {
		const target = Target.create(emoji, title, url, retention);

		expect(target.emoji.value).toBe("📚");
		expect(target.title.value).toBe("新刊情報");
		expect(target.url.value).toBe("https://example.com");
		expect(target.retention.value).toBe(30);
	});
});
