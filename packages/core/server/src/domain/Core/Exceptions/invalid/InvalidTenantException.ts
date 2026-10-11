export class InvalidTenantException extends Error {
	constructor() {
		super('InvalidTenantException');
		this.name = 'InvalidTenantException';
	}
}