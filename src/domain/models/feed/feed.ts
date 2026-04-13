import type { Url } from "../target/url/url.js";
import type { Link } from "./link/link.js";
import type { Title } from "./title/title.js";

export class Feed {
	private constructor(
		public readonly title: Title,
		public readonly link: Link,
		public readonly targetUrl: Url,
	) {}

	public static create(title: Title, link: Link, targetUrl: Url): Feed {
		return new Feed(title, link, targetUrl);
	}
}
