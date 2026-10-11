export class EmptyFileNameException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyFileNameException';
	}
}