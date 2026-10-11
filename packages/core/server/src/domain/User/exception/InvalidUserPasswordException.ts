export class InvalidUserPasswordException extends Error {
	constructor() {
		super('InvalidUserPasswordException');
		this.name = 'InvalidUserPasswordException';
	}
}