import { describe, expect, test } from "vitest";
import { feedBuilder, targetBuilder } from "../lib/test-helper.js";

describe("FeedList", () => {
	test("通知用のメッセージを生成できること", () => {
		// Arrange
		const feed = feedBuilder({
			title: "書籍のタイトル",
			url: "http://sample.com",
			target: targetBuilder({ emoji: "📚", title: "新刊情報" }),
		});

		// Act
		const message = feed.toNotifyMessage();

		// Assert
		expect(message).toBe(`📚 新刊情報\n書籍のタイトル\nhttp://sample.com`);
	});
});
