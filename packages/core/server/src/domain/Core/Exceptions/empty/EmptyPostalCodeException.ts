export class EmptyPostalCodeException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyPostalCodeException';
	}
}
