export class InvalidSystemSettingsException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidSystemSettingsException';
	}
}

