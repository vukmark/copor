export class InvalidChatException extends Error {
	constructor() {
		super('InvalidChatException');
		this.name = 'InvalidChatException';
	}
}
