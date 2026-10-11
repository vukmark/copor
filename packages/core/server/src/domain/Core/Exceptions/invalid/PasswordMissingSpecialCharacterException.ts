export class PasswordMissingSpecialCharacterException extends Error {
	constructor() {
		super('PasswordMissingSpecialCharacterException');
		this.name = 'PasswordMissingSpecialCharacterException';
	}
}
