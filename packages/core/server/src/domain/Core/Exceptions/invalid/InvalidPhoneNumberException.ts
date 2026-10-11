export class InvalidPhoneNumberException extends Error {
	constructor() {
		super('InvalidPhoneNumberException');
		this.name = 'InvalidPhoneNumberException';
	}
}