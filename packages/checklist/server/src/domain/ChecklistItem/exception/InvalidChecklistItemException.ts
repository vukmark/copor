export class InvalidChecklistItemException extends Error {
	constructor() {
		super('InvalidChecklistItemException');
		this.name = 'InvalidChecklistItemException';
	}
}