import { parseFeed } from "feedsmith";
import { Feed } from "../model/feed.js";
import type { Target } from "../model/target.js";

export interface IFetchFeedService {
	execute(target: Target): Promise<Feed[]>;
}

export class FetchFeedService {
	public async execute(target: Target): Promise<Feed[]> {
		return await fetch(target.url)
			.then((response) => response.text())
			.then((text) => {
				const { format, feed } = parseFeed(text);

				// RSSとRDFのみ対応
				if (format !== "rdf" && format !== "rss") {
					throw new Error(
						`Unsupported feed format: ${format}, URL: ${target.url}`,
					);
				}

				return (feed.items ?? []).map(
					(item) => new Feed(item.title ?? "", item.link ?? "", target),
				);
			});
	}
}
