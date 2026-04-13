import { beforeEach, describe, expect, test } from "vitest";
import { Character } from "../../models/exceptKeyword/character/character.js";
import { ExceptKeyword } from "../../models/exceptKeyword/exceptKeyword.js";
import { Feed } from "../../models/feed/feed.js";
import { Link } from "../../models/feed/link/link.js";
import { Title as FeedTitle } from "../../models/feed/title/title.js";
import { Category } from "../../models/history/category/category.js";
import { Expire } from "../../models/history/expire/expire.js";
import { History } from "../../models/history/history.js";
import { Title as HistoryTitle } from "../../models/history/title/title.js";
import { Emoji } from "../../models/target/emoji/emoji.js";
import { Retention } from "../../models/target/retention/retention.js";
import { Target } from "../../models/target/target.js";
import { Title as targetTitle } from "../../models/target/title/title.js";
import { Url } from "../../models/target/url/url.js";
import { FilterFeedDomainService } from "./filterFeedDomainService.js";

describe("FilterFeedDomainService", () => {
	let filterFeedDomainService: FilterFeedDomainService;

	beforeEach(() => {
		filterFeedDomainService = new FilterFeedDomainService();
	});

	// 共通で使う未来の日付
	const futureDate = new Date();
	futureDate.setDate(futureDate.getDate() + 1);

	test("履歴に存在するフィード（タイトルとカテゴリーが一致）を除外すること", () => {
		const target = Target.create(
			new Emoji("📚"),
			new targetTitle("新刊情報"),
			new Url("https://example.com/catalog/soon.xml"),
			new Retention(30),
		);
		const feed1 = Feed.create(
			new FeedTitle("新しい記事A"),
			new Link("https://example.com/rss"),
			new Url("https://example.com/catalog/soon.xml"),
		);
		const feed2 = Feed.create(
			new FeedTitle("新しい記事B"),
			new Link("https://example.com/rss"),
			new Url("https://example.com/catalog/soon.xml"),
		);
		const history = History.create(
			new Category("新刊情報"),
			new HistoryTitle("新しい記事A"),
			new Expire(futureDate),
		);

		const result = filterFeedDomainService.filter(
			[target],
			[feed1, feed2],
			[history],
			[],
		);

		expect(result).toHaveLength(1);
		expect(result[0].title.value).toBe("新しい記事B");
	});

	test("除外キーワードがタイトルに含まれるフィードを除外すること（大文字小文字を区別しない）", () => {
		const feed1 = Feed.create(
			new FeedTitle("TypeScriptの基礎"),
			new Link("https://example.com/1"),
			new Url("https://example.com/url"),
		);
		const feed2 = Feed.create(
			new FeedTitle("JavaScriptの応用"),
			new Link("https://example.com/2"),
			new Url("https://example.com/url"),
		);
		const keyword = ExceptKeyword.create(new Character("typescript"));

		const result = filterFeedDomainService.filter(
			[],
			[feed1, feed2],
			[],
			[keyword],
		);

		expect(result).toHaveLength(1);
		expect(result[0].title.value).toBe("JavaScriptの応用");
	});

	test("履歴にもキーワードにも該当しないフィードはすべて保持されること", () => {
		const feeds = [
			Feed.create(
				new FeedTitle("記事1"),
				new Link("https://example.com/1"),
				new Url("https://example.com/url1"),
			),
			Feed.create(
				new FeedTitle("記事2"),
				new Link("https://example.com/2"),
				new Url("https://example.com/url2"),
			),
		];

		const result = filterFeedDomainService.filter([], feeds, [], []);

		expect(result).toHaveLength(2);
	});

	test("履歴にタイトルが一致していても、カテゴリー（ターゲットのTitle）が異なれば除外されないこと", () => {
		const targetA = Target.create(
			new Emoji("🍎"),
			new targetTitle("ブログA"),
			new Url("https://example.com/a"),
			new Retention(30),
		);
		const feedA = Feed.create(
			new FeedTitle("記事A"),
			new Link("https://example.com/a/1"),
			new Url("https://example.com/a"),
		);
		// 履歴には同名タイトルがあるが、カテゴリーが「ブログB」
		const historyFromB = History.create(
			new Category("ブログB"),
			new HistoryTitle("記事A"),
			new Expire(futureDate),
		);

		const result = filterFeedDomainService.filter(
			[targetA],
			[feedA],
			[historyFromB],
			[],
		);

		expect(result).toHaveLength(1);
		expect(result[0].title.value).toBe("記事A");
	});
});
