export class InvalidToDoAttachmentException extends Error {
	constructor() {
		super('InvalidToDoAttachmentException');
		this.name = 'InvalidToDoAttachmentException';
	}
}