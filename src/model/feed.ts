import type { Target } from "./target.js";

export class Feed {
	public constructor(
		public readonly title: string,
		public readonly link: string,
		public readonly target: Target,
	) {}

	public toNotifyMessage(): string {
		return `${this.target.emoji} ${this.target.title}\n${this.title}\n${this.link}`;
	}
}
