export class EmptyCodeException extends Error {
	constructor() {
		super('EmptyCodeException');
		this.name = 'EmptyCodeException';
	}
}