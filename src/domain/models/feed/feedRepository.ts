import type { Url } from "../target/url/url.js";
import type { Feed } from "./feed.js";

export interface FeedRepository {
	fetch(url: Url): Promise<Feed[]>;
}
