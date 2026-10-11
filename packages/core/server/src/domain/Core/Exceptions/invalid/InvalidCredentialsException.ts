export class InvalidCredentialsException extends Error {
	constructor() {
		super('InvalidCredentialsException');
		this.name = 'InvalidCredentialsException';
	}
}
