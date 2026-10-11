export class SimpleDate {
	private day: number;
	private month: number;
	private year: number;

	public constructor(day: number, month: number, year: number) {
		this.day = day;
		this.month = month;
		this.year = year;
		this.validateDate();
	}

	public static fromPlainObject(obj: {year: number; month: number; day: number}): SimpleDate {
		return new SimpleDate(obj.year, obj.month, obj.day);
	}

	public getDay() {
		return this.day;
	}

	public getMonth() {
		return this.month;
	}

	public getYear() {
		return this.year;
	}

	public isAfter(tested: SimpleDate): boolean {
		if (this.year < tested.getYear())
			return false;
		if (this.year === tested.getYear() && this.month < tested.getMonth())
			return false;
		if (this.year === tested.getYear() && this.month === tested.getMonth() && this.day <= tested.getDay())
			return false;
		return true;
	}

	public isSameDate(tested: SimpleDate): boolean {
		if (this.year === tested.getYear() && this.month === tested.getMonth() && this.day === tested.getDay())
			return true;
		return false;
	}

	private validateDate(): void {
		if (!this.isValidDay(this.day, this.month, this.year)) {
			throw new SimpleDateInvalidDayException(`${this.day}`);
		}
		if (!this.isValidMonth(this.month)) {
			throw new SimpleDateInvalidMonthException(`${this.month}`);
		}
		if (!this.isValidYear(this.year)) {
			throw new SimpleDateInvalidYearException(`${this.year}`);
		}
	}

	private isValidDay(day: number, month: number, year: number) {
		const daysInMonth = new Date(year, month, 0).getDate();

		return day >= 1 && day <= daysInMonth;
	}

	private isValidMonth(month: number) {
		return month >= 1 && month <= 12;
	}

	private isValidYear(year: number) {
		return year >= 1;
	}
}

export class SimpleDateInvalidDayException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleDateInvalidDayException';
	}
}

export class SimpleDateInvalidMonthException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleDateInvalidMonthException';
	}
}

export class SimpleDateInvalidYearException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleDateInvalidYearException';
	}
}