export class InvalidQueuedEmailException extends Error {
	constructor() {
		super('InvalidQueuedEmailException');
		this.name = 'InvalidQueuedEmailException';
	}
}