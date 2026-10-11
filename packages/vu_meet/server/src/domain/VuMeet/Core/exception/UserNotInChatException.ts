export class UserNotInChatException extends Error {
	constructor() {
		super('UserNotInChatException');
		this.name = 'UserNotInChatException';
	}
}
