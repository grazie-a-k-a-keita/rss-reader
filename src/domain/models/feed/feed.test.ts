import { describe, expect, test } from "vitest";
import { Url } from "../target/url/url.js";
import { Feed } from "./feed.js";
import { Link } from "./link/link.js";
import { Title } from "./title/title.js";

describe("Feed", () => {
	test("Feedクラスのインスタンスを作成できること", () => {
		const feed = Feed.create(
			new Title("記事タイトル"),
			new Link("https://example.com/article"),
			new Url("https://example.com"),
		);

		expect(feed.title.value).toBe("記事タイトル");
		expect(feed.link.value).toBe("https://example.com/article");
		expect(feed.targetUrl.value).toBe("https://example.com");
	});
});
