import type { Feed } from "../../domain/models/feed/feed.js";
import type { Target } from "../../domain/models/target/target.js";

export interface NotifyManager {
	send(target: Target, feed: Feed): Promise<void>;
}
