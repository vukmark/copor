import {GetCurrentUTCDateRepo} from '../GetCurrentUTCDateRepo';

export class CurrentUTCDate implements GetCurrentUTCDateRepo {
	private currentUTCDate: Date;
	public constructor() {
		const now = new Date();

		this.currentUTCDate = new Date(
			Date.UTC(
				now.getUTCFullYear(),
				now.getUTCMonth(),
				now.getUTCDate(),
				now.getUTCHours(),
				now.getUTCMinutes(),
				now.getUTCSeconds(),
				now.getUTCMilliseconds()
			)
		);
	}
	public getCurrentUTCDate(): Date {
		return this.currentUTCDate;
	}
}
