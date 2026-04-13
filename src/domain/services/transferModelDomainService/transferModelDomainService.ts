import type { Feed } from "../../models/feed/feed.js";
import { Category } from "../../models/history/category/category.js";
import { Expire } from "../../models/history/expire/expire.js";
import { History } from "../../models/history/history.js";
import { Title } from "../../models/history/title/title.js";
import type { Target } from "../../models/target/target.js";

export class TransferModelDomainService {
	public toHistory(target: Target, feeds: Feed[]): History[] {
		const category = new Category(target.title.value);

		return feeds.map((feed) => {
			const title = new Title(feed.title.value);
			const expire = new Expire(new Date()).addDays(target.retention.value);

			return History.create(category, title, expire);
		});
	}
}
