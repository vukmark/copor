export class EmailAlreadyInUseException extends Error {
	constructor() {
		super('EmailAlreadyInUseException');
		this.name = 'EmailAlreadyInUseException';
	}
}
