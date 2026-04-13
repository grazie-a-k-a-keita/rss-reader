import { ValueObject } from "../../shared/valueObject.js";

export class Emoji extends ValueObject<string, "Emoji"> {
	static readonly MAX_LENGTH = 1;

	protected validate(value: string): void {
		if ([...value].length > Emoji.MAX_LENGTH) {
			throw new Error("Emoji must be a single character");
		}
	}
}
