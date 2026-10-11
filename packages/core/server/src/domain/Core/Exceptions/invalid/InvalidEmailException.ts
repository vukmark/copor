export class InvalidEmailException extends Error {
	constructor() {
		super('InvalidEmailException');
		this.name = 'InvalidEmailException';
	}
}