export class InvalidLanguageException extends Error {
	constructor() {
		super('InvalidLanguageException');
		this.name = 'InvalidLanguageException';
	}
}