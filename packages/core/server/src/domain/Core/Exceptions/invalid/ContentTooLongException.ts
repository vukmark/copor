export class ContentTooLongException extends Error {
	constructor() {
		super('ContentTooLongException');
		this.name = 'ContentTooLongException';
	}
}
