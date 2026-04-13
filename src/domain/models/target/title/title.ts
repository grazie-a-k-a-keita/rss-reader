import { ValueObject } from "../../shared/valueObject.js";

export class Title extends ValueObject<string, "Title"> {
	static readonly MAX_LENGTH = 100;
	static readonly MIN_LENGTH = 1;

	protected validate(value: string): void {
		if (value.length > Title.MAX_LENGTH) {
			throw new Error(
				`Title must be less than or equal to ${Title.MAX_LENGTH} characters`,
			);
		}

		if (value.length < Title.MIN_LENGTH) {
			throw new Error(
				`Title must be greater than or equal to ${Title.MIN_LENGTH} characters`,
			);
		}
	}
}
