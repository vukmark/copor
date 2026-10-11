export class InvalidDateRangeException extends Error {
	constructor() {
		super('InvalidDateRangeException');
		this.name = 'InvalidDateRangeException';
	}
}