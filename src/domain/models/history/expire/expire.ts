import dayjs from "dayjs";
import { ValueObject } from "../../shared/valueObject.js";

export class Expire extends ValueObject<Date, "Expire"> {
	protected validate(): void {}

	public addDays(days: number): Expire {
		const expireDate = dayjs(this.value).add(days, "day").toDate();
		return new Expire(expireDate);
	}
}
