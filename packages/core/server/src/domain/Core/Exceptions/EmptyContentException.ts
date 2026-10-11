export class EmptyContentException extends Error {
	constructor() {
		super('EmptyContentException');
		this.name = 'EmptyContentException';
	}
}
