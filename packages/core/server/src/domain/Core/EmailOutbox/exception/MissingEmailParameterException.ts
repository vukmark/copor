export class MissingEmailParameterException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyStringException';
	}
}