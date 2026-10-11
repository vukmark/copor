export class PasswordMissingUppercaseException extends Error {
	constructor() {
		super('PasswordMissingUppercaseException');
		this.name = 'PasswordMissingUppercaseException';
	}
}
