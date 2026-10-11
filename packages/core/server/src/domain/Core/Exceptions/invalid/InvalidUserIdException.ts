export class InvalidUserIdException extends Error {
	constructor() {
		super('InvalidUserIdException');
		this.name = 'InvalidUserIdException';
	}
}
