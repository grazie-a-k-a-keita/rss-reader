import type { NotifyManager } from "../../../application/shared/notifyManager.js";
import type { Feed } from "../../../domain/models/feed/feed.js";
import type { Target } from "../../../domain/models/target/target.js";

export class LocalNotifyManager implements NotifyManager {
	public async send(target: Target, feed: Feed): Promise<void> {
		console.log(`${target.emoji.value} ${target.title.value}`);
		console.log(`${feed.title.value}`);
		console.log(`${feed.link.value}`);
		console.log(`--------------------`);
	}
}
