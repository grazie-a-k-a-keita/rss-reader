import { ValueObject } from "../../shared/valueObject.js";

export class Category extends ValueObject<string, "Category"> {
	protected validate(_value: string): void {}
}
