export class AuthUserEmailAlreadyInUseException extends Error {
	constructor() {
		super('AuthUserEmailAlreadyInUseException');
		this.name = 'AuthUserEmailAlreadyInUseException';
	}
}
