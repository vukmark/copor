export class CannotUpdateAccountException extends Error {
	constructor() {
		super('CannotUpdateAccountException');
		this.name = 'CannotUpdateAccountException';
	}
}