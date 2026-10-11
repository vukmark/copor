export class EmptyPhoneNumberException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyPhoneNumberException';
	}
}