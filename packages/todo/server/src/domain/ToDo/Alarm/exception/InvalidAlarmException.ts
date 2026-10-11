export class InvalidAlarmException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidAlarmException';
	}
}