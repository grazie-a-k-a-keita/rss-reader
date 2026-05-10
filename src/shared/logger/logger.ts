type LoggerPrefix = "DailyBatch";

export class Logger {
	public constructor(private readonly prefix: LoggerPrefix) {}

	public info(message: string) {
		console.info(`[${this.prefix}] [INFO] ${message}`);
	}
}
