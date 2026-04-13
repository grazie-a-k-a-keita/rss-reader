import { ValueObject } from "../../shared/valueObject.js";

export class Title extends ValueObject<string, "Title"> {
	protected validate(_value: string): void {}
}
