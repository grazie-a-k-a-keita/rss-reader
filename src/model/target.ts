export class Target {
	private constructor(
		public readonly emoji: string,
		public readonly title: string,
		public readonly url: string,
		/** 保持期間（日数） */
		public readonly retention: number,
	) {}

	public static create(
		emoji: string,
		title: string,
		url: string,
		retention: number,
	): Target {
		if (!URL.canParse(url)) throw new Error("URL is invalid");

		return new Target(emoji, title, url, retention);
	}
}
