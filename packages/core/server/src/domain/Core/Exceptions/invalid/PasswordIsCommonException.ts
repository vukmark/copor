export class PasswordIsCommonException extends Error {
	constructor() {
		super('PasswordIsCommonException');
		this.name = 'PasswordIsCommonException';
	}
}
