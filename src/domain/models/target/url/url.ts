import { ValueObject } from "../../shared/valueObject.js";

export class Url extends ValueObject<string, "Url"> {
	protected validate(value: string): void {
		if (!URL.canParse(value)) {
			throw new Error("URL is invalid");
		}
	}
}
