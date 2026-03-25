import { describe, expect, test } from "vitest";
import {
	feedBuilder,
	historyBuilder,
	targetBuilder,
} from "../lib/test-helper.js";
import { FeedList } from "./feed-list.js";

describe("FeedList", () => {
	test("履歴に存在する「Java入門」のフィードを除外できること", () => {
		// Arrange
		const target = targetBuilder({ title: "新刊情報" });
		const feedList = new FeedList([
			feedBuilder({ title: "Java入門", target }),
			feedBuilder({ title: "C#入門", target }),
		]);

		// Act
		const result = feedList.filterHistories([
			historyBuilder({ targetTitle: "新刊情報", title: "Java入門" }),
		]);

		// Assert
		expect(result.feeds).toEqual([feedBuilder({ title: "C#入門", target })]);
	});

	test("キーワード「Java」を含む「Java入門」のフィードを除外できること", () => {
		// Arrange
		const target = targetBuilder({ title: "新刊情報" });
		const feedList = new FeedList([
			feedBuilder({ title: "Java入門", target }),
			feedBuilder({ title: "C#入門", target }),
		]);

		// Act
		const result = feedList.filterByKeywords(["Java"]);

		// Assert
		expect(result.feeds).toEqual([feedBuilder({ title: "C#入門", target })]);
	});

	test("キーワードの大文字・小文字を区別せずにフィードを除外できること", () => {
		// Arrange
		const target = targetBuilder({ title: "新刊情報" });
		const feedList = new FeedList([
			feedBuilder({ title: "Java入門", target }),
			feedBuilder({ title: "C#入門", target }),
		]);

		// Act
		const result = feedList.filterByKeywords(["java"]);

		// Assert
		expect(result.feeds).toEqual([feedBuilder({ title: "C#入門", target })]);
	});
});
