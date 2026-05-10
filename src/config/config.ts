import "dotenv/config";

export const config = {
	discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL || "",
	s3: { bucketName: "rss-reader-store-for-onokeita" },
};
