export class InactiveUserException extends Error {
	constructor() {
		super('InactiveUserException');
		this.name = 'InactiveUserException';
	}
}