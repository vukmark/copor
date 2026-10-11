export class AuthUsernameAlreadyInUseException extends Error {
	constructor() {
		super('AuthUsernameAlreadyInUseException');
		this.name = 'AuthUsernameAlreadyInUseException';
	}
}
