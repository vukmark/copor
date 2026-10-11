export class PasswordMissingLowercaseException extends Error {
	constructor() {
		super('PasswordMissingLowercaseException');
		this.name = 'PasswordMissingLowercaseException';
	}
}
