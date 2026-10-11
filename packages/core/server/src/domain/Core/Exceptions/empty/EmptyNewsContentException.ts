export class EmptyNewsContentException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyNewsContentException';
	}
}