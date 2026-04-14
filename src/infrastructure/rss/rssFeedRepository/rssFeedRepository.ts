import { parseFeed } from "feedsmith";
import { Feed } from "../../../domain/models/feed/feed.js";
import type { FeedRepository } from "../../../domain/models/feed/feedRepository.js";
import { Link } from "../../../domain/models/feed/link/link.js";
import { Title } from "../../../domain/models/feed/title/title.js";
import type { Url } from "../../../domain/models/target/url/url.js";

export class RssFeedRepository implements FeedRepository {
	public async fetch(url: Url): Promise<Feed[]> {
		return await fetch(url.value)
			.then((response) => response.text())
			.then((text) => {
				const { format, feed } = parseFeed(text);

				if (format === "json") {
					throw new Error(
						`Unsupported feed format: ${format}, URL: ${url.value}`,
					);
				}

				if (format === "atom") {
					return (feed.entries ?? []).map((entry) =>
						Feed.create(
							new Title(entry.title ?? ""),
							new Link(entry.links?.[0]?.href ?? ""),
							url,
						),
					);
				}

				return (feed.items ?? []).map((item) =>
					Feed.create(
						new Title(item.title ?? ""),
						new Link(item.link ?? ""),
						url,
					),
				);
			});
	}
}
