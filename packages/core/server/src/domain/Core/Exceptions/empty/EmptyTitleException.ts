export class EmptyTitleException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyTitleException';
	}
}