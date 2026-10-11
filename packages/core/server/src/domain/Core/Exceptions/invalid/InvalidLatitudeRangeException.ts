export class InvalidLatitudeRangeException extends Error {
	constructor() {
		super('Latitude must be between -90 and 90');
		this.name = 'InvalidLatitudeRangeException';
	}
}