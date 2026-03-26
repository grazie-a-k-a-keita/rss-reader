import { describe, expect, test, vi } from "vitest";
import { feedBuilder, targetBuilder } from "../lib/test-helper.js";
import type { Feed } from "../model/feed.js";
import type { Target } from "../model/target.js";
import { InMemoryExceptKeywordRepository } from "../repository/exceptKeywordRepository.js";
import { InMemoryHistoriesRepository } from "../repository/historiesRepository.js";
import { InMemoryTargetsRepository } from "../repository/targetsRepository.js";
import type { IFetchFeedService } from "../service/fetchFeedService.js";
import { GetInformationService } from "../service/getInformationService.js";
import type { INotifyService } from "../service/notifyService.js";

class TestFetchFeedService implements IFetchFeedService {
	public async execute(target: Target): Promise<Feed[]> {
		if (target.title !== "恐竜のニュース") return [];
		return [
			feedBuilder({
				title: "書籍のタイトル",
				url: "http://sample.com/book",
				target,
			}),
		];
	}
}

class TestNotifyService implements INotifyService {
	public async execute(message: { content: string }): Promise<void> {
		console.log(message.content);
	}
}

describe("Integration Test", () => {
	test("未通知のフィードを通知し、履歴に追加されること", async () => {
		// Arrange
		const logSpy = vi.spyOn(console, "log");
		const targetsRepository = new InMemoryTargetsRepository([
			targetBuilder({
				emoji: "🦖",
				title: "恐竜のニュース",
				url: "https://example.com",
			}),
		]);
		const historiesRepository = new InMemoryHistoriesRepository();
		const notifyService = new TestNotifyService();
		const sut = new GetInformationService(
			new InMemoryExceptKeywordRepository(),
			targetsRepository,
			historiesRepository,
			new TestFetchFeedService(),
			notifyService,
		);

		// Act
		await sut.execute();

		// Assert
		const savedHistories = await historiesRepository.findAll();
		expect(savedHistories[0].targetTitle).toBe("恐竜のニュース");
		expect(savedHistories[0].title).toBe("書籍のタイトル");
		expect(logSpy).toHaveBeenCalledWith(
			`🦖 恐竜のニュース\n書籍のタイトル\nhttp://sample.com/book`,
		);
	});
});
