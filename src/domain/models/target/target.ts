import type { Emoji } from "./emoji/emoji.js";
import type { Retention } from "./retention/retention.js";
import type { Title } from "./title/title.js";
import type { Url } from "./url/url.js";

export class Target {
	private constructor(
		public readonly emoji: Emoji,
		public readonly title: Title,
		public readonly url: Url,
		public readonly retention: Retention,
	) {}

	public static create(emoji: Emoji, title: Title, url: Url, retention: Retention): Target {
		return new Target(emoji, title, url, retention);
	}
}
