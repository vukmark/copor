export class InvalidContractTypeException extends Error {
	constructor() {
		super('InvalidContractTypeException');
		this.name = 'InvalidContractTypeException';
	}
}