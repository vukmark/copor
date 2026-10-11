export class InvalidCloudFileException extends Error {
	constructor() {
		super('InvalidCloudFileException');
		this.name = 'InvalidCloudFileException';
	}
}