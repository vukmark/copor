export class InvalidDateOrderException extends Error {
	constructor() {
		super('InvalidDateOrderException');
		this.name = 'InvalidDateOrderException';
	}
}