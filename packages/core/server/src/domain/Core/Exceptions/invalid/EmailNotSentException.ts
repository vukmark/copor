export class EmailNotSentException extends Error {
	constructor(error?: string) {
		super(`UnableToSendEmailException ${String(error) ?? ''}`);
		this.name = 'UnableToSendEmailException';
	}
}