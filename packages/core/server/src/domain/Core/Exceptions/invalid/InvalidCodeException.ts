export class InvalidCodeException extends Error {
	constructor() {
		super('InvalidCodeException');
		this.name = 'InvalidCodeException';
	}
}
