export class PasswordTooShortException extends Error {
	constructor() {
		super('PasswordTooShortException');
		this.name = 'PasswordTooShortException';
	}
}
