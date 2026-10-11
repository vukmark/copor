export class InvalidToDoException extends Error {
	constructor() {
		super('InvalidToDoException');
		this.name = 'InvalidToDoException';
	}
}