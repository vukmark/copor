export class PasswordTooLongException extends Error {
	constructor() {
		super('PasswordTooLongException');
		this.name = 'PasswordTooLongException';
	}
}
