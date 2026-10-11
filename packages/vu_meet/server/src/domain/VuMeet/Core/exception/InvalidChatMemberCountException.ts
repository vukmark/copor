export class InvalidChatMemberCountException extends Error {
	constructor() {
		super('InvalidChatMemberCountException');
		this.name = 'InvalidChatMemberCountException';
	}
}
