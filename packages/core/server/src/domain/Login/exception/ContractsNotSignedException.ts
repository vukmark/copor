export class ContractsNotSignedException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ContractsNotSignedException';
	}
}