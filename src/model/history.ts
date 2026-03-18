export class History {
	constructor(
		public readonly targetTitle: string,
		public readonly title: string,
		public readonly expireDate: Date,
	) {}
}
