export class EmptyIDInListException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyIDInListException';
	}
}