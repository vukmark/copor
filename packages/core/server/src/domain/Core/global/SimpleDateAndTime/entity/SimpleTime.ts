export class SimpleTime {
	private hours: number;
	private minutes: number;
	private seconds: number;
	private milliseconds: number;
	public constructor(hours: number, minutes: number, seconds: number = 0, milliseconds: number = 0) {
		this.validateHours(hours);
		this.validateMinutes(minutes);
		this.validateSeconds(seconds);
		this.validateMiliseconds(milliseconds);
		this.hours = hours;
		this.minutes = minutes;
		this.seconds = seconds;
		this.milliseconds = milliseconds;
	}
	public getHours(): number {
		return this.hours;
	}
	public getMinutes(): number {
		return this.minutes;
	}
	public getSeconds(): number {
		return this.seconds;
	}
	public getMilliseconds(): number {
		return this.milliseconds;
	}
	public isLaterThan(testedTime: SimpleTime) {
		if (this.hours < testedTime.hours)
			return false;
		if (this.hours === testedTime.getHours() && this.minutes < testedTime.getMinutes())
			return false;
		if (this.hours === testedTime.getHours()
			&& this.minutes === testedTime.getMinutes()
			&& this.seconds < testedTime.getSeconds())
			return false;
		if (this.hours === testedTime.getHours()
			&& this.minutes === testedTime.getMinutes()
			&& this.seconds === testedTime.getSeconds()
			&& this.milliseconds < testedTime.getMilliseconds())
			return false;
		return true;
	}

	private validateHours(hours: number) {
		if (hours < 0 || hours > 23)
			throw new SimpleTimeInvalidHoursException();
	}
	private validateMinutes(minutes: number) {
		if (minutes < 0 || minutes > 59)
			throw new SimpleTimeInvalidMinutesException();
	}
	private validateSeconds(seconds: number) {
		if (seconds < 0 || seconds > 59)
			throw new SimpleTimeInvalidSecondsException();
	}
	private validateMiliseconds(miliseconds: number) {
		if (miliseconds < 0)
			throw new SimpleTimeInvalidMillisecondsException();
	}
}

export class SimpleTimeInvalidMinutesException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleTimeInvalidMinutesException';
	}
}
export class SimpleTimeInvalidHoursException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleTimeInvalidHoursException';
	}
}
export class SimpleTimeInvalidSecondsException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleTimeInvalidSecondsException';
	}
}
export class SimpleTimeInvalidMillisecondsException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'SimpleTimeInvalidMilisecondsException';
	}
}
