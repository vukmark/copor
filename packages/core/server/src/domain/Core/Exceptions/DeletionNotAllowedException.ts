export class DeletionNotAllowedException extends Error {
	public table: string;
	public translationKey: string = 'DeletionNotAllowedException';

	constructor(table: string) {
		super('DeletionNotAllowedException');
		this.name = 'DeletionNotAllowedException';
		this.table = table;
	}
}