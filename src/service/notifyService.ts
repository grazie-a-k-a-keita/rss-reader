export class NotifyService {
	public constructor(private readonly discordWebhookUrl: string) {}

	public async execute(message: { content: string }) {
		const res = await fetch(this.discordWebhookUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(message),
		});

		if (!res.ok) {
			throw new Error(`Failed to send message: ${res.statusText}`);
		}
	}
}
