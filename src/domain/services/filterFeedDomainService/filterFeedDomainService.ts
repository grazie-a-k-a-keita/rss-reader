import type { ExceptKeyword } from "../../models/exceptKeyword/exceptKeyword.js";
import type { Feed } from "../../models/feed/feed.js";
import type { History } from "../../models/history/history.js";
import type { Target } from "../../models/target/target.js";

export class FilterFeedDomainService {
	/**
	 * 履歴に存在する通知済みのフィードと、タイトルに特定のキーワードを含むフィードを除外
	 */
	public filter(
		targets: Target[],
		feeds: Feed[],
		histories: History[],
		exceptKeywords: ExceptKeyword[],
	): Feed[] {
		const loweredKeywords = exceptKeywords.map((k) =>
			k.character.value.toLowerCase(),
		);

		return feeds
			.filter((feed) => {
				const target = targets.find(
					(t) => t.url.value === feed.targetUrl.value,
				);

				return !histories.some(
					(history) =>
						history.category.value === target?.title.value &&
						history.title.value === feed.title.value,
				);
			})
			.filter((feed) => {
				const title = feed.title.value.toLowerCase();
				return !loweredKeywords.some((keyword) => title.includes(keyword));
			});
	}
}
