export class InvalidNewsException extends Error {
	constructor() {
		super('InvalidNewsException');
		this.name = 'InvalidNewsException';
	}
}