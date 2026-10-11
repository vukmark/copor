export class EmptyGroupChatNameException extends Error {
	constructor() {
		super('EmptyGroupChatNameException');
		this.name = 'EmptyGroupChatNameException';
	}
}
