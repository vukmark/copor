export class PasswordContainsUsernameException extends Error {
	constructor() {
		super('PasswordContainsUsernameException');
		this.name = 'PasswordContainsUsernameException';
	}
}
