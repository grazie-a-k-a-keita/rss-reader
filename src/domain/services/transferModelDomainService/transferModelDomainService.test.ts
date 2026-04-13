import dayjs from "dayjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Feed } from "../../models/feed/feed.js";
import { Link } from "../../models/feed/link/link.js";
import { Title as FeedTitle } from "../../models/feed/title/title.js";
import { Emoji } from "../../models/target/emoji/emoji.js";
import { Retention } from "../../models/target/retention/retention.js";
import { Target } from "../../models/target/target.js";
import { Title as TargetTitle } from "../../models/target/title/title.js";
import { Url } from "../../models/target/url/url.js";
import { TransferModelDomainService } from "./transferModelDomainService.js";

describe("TransferModelDomainService", () => {
	const transferModelDomainService = new TransferModelDomainService();

	beforeEach(() => {
		// 現在時刻を固定する（有効期限の計算をテストするため）
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2024-01-01T00:00:00Z"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("Feedの配列を正しくHistoryの配列に変換できること", () => {
		const target = Target.create(
			new Emoji("📰"),
			new TargetTitle("ニュース"),
			new Url("https://example.com/rss"),
			new Retention(7),
		);
		const feeds = [
			Feed.create(
				new FeedTitle("記事1"),
				new Link("https://example.com/1"),
				new Url("https://example.com/rss"),
			),
			Feed.create(
				new FeedTitle("記事2"),
				new Link("https://example.com/2"),
				new Url("https://example.com/rss"),
			),
		];

		const result = transferModelDomainService.toHistory(target, feeds);

		expect(result).toHaveLength(2);
		expect(result[0].category.value).toBe("ニュース");
		expect(result[0].title.value).toBe("記事1");
		const expectedExpire = dayjs("2024-01-01T00:00:00Z").add(7, "day").toDate();
		expect(result[0].expire.value).toEqual(expectedExpire);
		expect(result[1].title.value).toBe("記事2");
	});

	it("空のFeed配列を渡した場合は空のHistory配列を返すこと", () => {
		const target = Target.create(
			new Emoji("📰"),
			new TargetTitle("ニュース"),
			new Url("https://example.com/rss"),
			new Retention(7),
		);

		const result = transferModelDomainService.toHistory(target, []);

		expect(result).toHaveLength(0);
	});
});
