export class PasswordTooManyRepeatedCharactersException extends Error {
	constructor() {
		super('PasswordTooManyRepeatedCharactersException');
		this.name = 'PasswordTooManyRepeatedCharactersException';
	}
}
