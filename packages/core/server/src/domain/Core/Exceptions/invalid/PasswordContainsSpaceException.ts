export class PasswordContainsSpaceException extends Error {
	constructor() {
		super('PasswordContainsSpaceException');
		this.name = 'PasswordContainsSpaceException';
	}
}
