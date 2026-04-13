import { ValueObject } from "../../shared/valueObject.js";

export class Link extends ValueObject<string, "Link"> {
	protected validate(value: string): void {
		if (!URL.canParse(value)) {
			throw new Error("Invalid URL format");
		}
	}
}
