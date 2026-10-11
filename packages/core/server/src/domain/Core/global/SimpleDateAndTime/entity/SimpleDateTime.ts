import {SimpleDate} from './SimpleDate';
import {SimpleTime} from './SimpleTime';

export class SimpleDateTime {
	private date: SimpleDate;
	private time: SimpleTime;
	constructor(day: number, month: number, year: number, hours: number, minutes: number, seconds: number = 0, milliseconds: number = 0) {
		this.date = new SimpleDate(day, month, year);
		this.time = new SimpleTime(hours, minutes, seconds, milliseconds);
	}
	public getDate(): SimpleDate {
		return this.date;
	}

	public setDate(value: SimpleDate) {
		this.date = value;
	}
	public getTime(): SimpleTime {
		return this.time;
	}

	public setTime(value: SimpleTime) {
		this.time = value;
	}
	public isAfter(tested: SimpleDateTime): boolean {
		if (this.date.isAfter(tested.getDate()))
			return true;
		if (this.date.isSameDate(tested.getDate()) && this.time.isLaterThan(tested.getTime()))
			return true;
		return false;
	}
}
