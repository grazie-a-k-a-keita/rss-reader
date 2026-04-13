export abstract class ValueObject<T, U> {
	// @ts-expect-error
	// biome-ignore lint/correctness/noUnusedPrivateClassMembers: <>
	private _type: U;
	public readonly value: T;

	public constructor(value: T) {
		this.validate(value);
		this.value = value;
	}

	protected abstract validate(value: T): void;
}
