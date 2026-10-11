export class PasswordContainsEmailOrNameException extends Error {
	constructor() {
		super('PasswordContainsEmailOrNameException');
		this.name = 'PasswordContainsEmailOrNameException';
	}
}
