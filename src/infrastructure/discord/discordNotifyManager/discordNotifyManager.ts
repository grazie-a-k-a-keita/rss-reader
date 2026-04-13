import type { NotifyManager } from "../../../application/shared/notifyManager.js";
import type { Feed } from "../../../domain/models/feed/feed.js";
import type { Target } from "../../../domain/models/target/target.js";

export class DiscordNotifyManager implements NotifyManager {
	public constructor(private readonly discordWebhookUrl: string) {}

	public async send(target: Target, feed: Feed): Promise<void> {
		const content = this.toMessageContent(target, feed);

		const res = await fetch(this.discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content }),
		});

		if (!res.ok) {
			throw new Error(`Failed to send message: ${res.statusText}`);
		}
	}

	private toMessageContent(target: Target, feed: Feed): string {
		return `${target.emoji.value} ${target.title.value}\n${feed.title.value}\n${feed.link.value}`;
	}
}
