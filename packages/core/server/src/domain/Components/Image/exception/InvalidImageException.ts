export class InvalidImageException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidImageException';
	}
}