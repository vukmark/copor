export class InvalidIDException extends Error {
	constructor() {
		super('InvalidIDException');
		this.name = 'InvalidIDException';
	}
}