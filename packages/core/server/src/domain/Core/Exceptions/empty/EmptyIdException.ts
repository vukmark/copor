export class EmptyIdException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyIDException';
	}
}