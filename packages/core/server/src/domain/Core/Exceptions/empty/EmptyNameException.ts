export class EmptyNameException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyNameException';
	}
}