export class InvalidToDoCommentException extends Error {
	constructor() {
		super('InvalidCommentIdException');
		this.name = 'InvalidCommentIdException';
	}
}