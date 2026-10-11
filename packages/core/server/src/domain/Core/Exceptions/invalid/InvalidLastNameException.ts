export class InvalidLastNameException extends Error {
	constructor() {
		super('InvalidLastNameException');
		this.name = 'InvalidLastNameException';
	}
}