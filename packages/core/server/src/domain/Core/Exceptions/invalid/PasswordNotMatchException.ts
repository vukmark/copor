export class PasswordNotMatchException extends Error {
	constructor() {
		super('PasswordNotMatchException');
		this.name = 'PasswordNotMatchException';
	}
}
