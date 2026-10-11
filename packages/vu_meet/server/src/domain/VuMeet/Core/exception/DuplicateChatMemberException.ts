export class DuplicateChatMemberException extends Error {
	constructor() {
		super('DuplicateChatMemberException');
		this.name = 'DuplicateChatMemberException';
	}
}
