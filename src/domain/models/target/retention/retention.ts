import { ValueObject } from "../../shared/valueObject.js";

/** 保持期間（日数） */
export class Retention extends ValueObject<number, "Retention"> {
	static readonly MAX_DAYS = 90;
	static readonly MIN_DAYS = 0;

	protected validate(value: number): void {
		if (value > Retention.MAX_DAYS) {
			throw new Error(`Retention must be less than or equal to ${Retention.MAX_DAYS} days`);
		}

		if (value < Retention.MIN_DAYS) {
			throw new Error(`Retention must be greater than or equal to ${Retention.MIN_DAYS} days`);
		}
	}
}
