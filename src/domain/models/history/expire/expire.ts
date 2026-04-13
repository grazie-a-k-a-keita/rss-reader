import dayjs from "dayjs";
import { ValueObject } from "../../shared/valueObject.js";

export class Expire extends ValueObject<Date, "Expire"> {
	protected validate(value: Date): void {
		if (dayjs(value).isBefore(dayjs(), "day")) {
			throw new Error("Expire date cannot be in the past");
		}
	}

	public addDays(days: number): Expire {
		const expireDate = dayjs(this.value).add(days, "day").toDate();
		return new Expire(expireDate);
	}
}
