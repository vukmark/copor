export class ForbiddenAccessException extends Error {
	constructor() {
		super('ForbiddenAccessException');
		this.name = 'ForbiddenAccessException';
	}
}

