export class EmptyAddressException extends Error {
	constructor(message?: string) {
		super('EmptyAddressException');
		this.name = 'EmptyAddressException';
	}
}