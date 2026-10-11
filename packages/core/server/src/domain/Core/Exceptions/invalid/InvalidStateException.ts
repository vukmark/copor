export class InvalidStateException extends Error {
	constructor() {
		super('InvalidStateException');
		this.name = 'InvalidStateException';
	}
}