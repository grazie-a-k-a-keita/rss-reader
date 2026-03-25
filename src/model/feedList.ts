import type { Feed } from "./feed.js";
import type { History } from "./history.js";

export class FeedList {
	public constructor(public readonly feeds: Feed[]) {}

	/** 履歴に存在するフィードを除外 */
	public filterHistories(histories: History[]): FeedList {
		return new FeedList(
			this.feeds.filter(
				(feed) =>
					!histories.some(
						(history) =>
							history.targetTitle === feed.target.title &&
							history.title === feed.title,
					),
			),
		);
	}

	/** 指定したキーワードを含むフィードを除外 */
	public filterByKeywords(keywords: string[]): FeedList {
		const loweredKeywords = keywords.map((k) => k.toLowerCase());

		return new FeedList(
			this.feeds.filter((feed) => {
				const title = feed.title.toLowerCase();
				return !loweredKeywords.some((keyword) => title.includes(keyword));
			}),
		);
	}
}
