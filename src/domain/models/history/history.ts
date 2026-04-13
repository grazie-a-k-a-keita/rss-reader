import type { Category } from "./category/category.js";
import type { Expire } from "./expire/expire.js";
import type { Title } from "./title/title.js";

export class History {
	private constructor(
		public readonly category: Category,
		public readonly title: Title,
		public readonly expire: Expire,
	) {}

	public static create(
		category: Category,
		title: Title,
		expireDate: Expire,
	): History {
		return new History(category, title, expireDate);
	}
}
