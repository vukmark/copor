export class InvalidLongitudeRangeException extends Error {
	constructor() {
		super('Longitude must be between -180 and 180');
		this.name = 'InvalidLongitudeRangeException';
	}
}