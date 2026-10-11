export class InvalidFirstNameException extends Error {
	constructor() {
		super('InvalidFirstNameException');
		this.name = 'InvalidFirstNameException';
	}
}