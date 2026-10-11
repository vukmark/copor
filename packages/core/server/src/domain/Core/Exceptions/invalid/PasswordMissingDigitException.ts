export class PasswordMissingDigitException extends Error {
	constructor() {
		super('PasswordMissingDigitException');
		this.name = 'PasswordMissingDigitException';
	}
}
