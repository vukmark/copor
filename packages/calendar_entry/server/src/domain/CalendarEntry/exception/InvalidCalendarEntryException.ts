export class InvalidCalendarEntryException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidCalendarEntryException';
	}
}
