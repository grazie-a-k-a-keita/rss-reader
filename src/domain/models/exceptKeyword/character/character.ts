import { ValueObject } from "../../shared/valueObject.js";

export class Character extends ValueObject<string, "Character"> {
	static readonly MAX_LENGTH = 30;
	static readonly MIN_LENGTH = 1;

	protected validate(value: string): void {
		if (value.length > Character.MAX_LENGTH) {
			throw new Error(`Character must be less than or equal to ${Character.MAX_LENGTH} characters`);
		}

		if (value.length < Character.MIN_LENGTH) {
			throw new Error(`Character must be greater than or equal to ${Character.MIN_LENGTH} characters`);
		}
	}
}
