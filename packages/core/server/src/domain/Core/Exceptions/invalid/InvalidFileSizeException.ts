export class InvalidFileSizeException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidFileSizeException';
	}
}