export class NotBaseTenantException extends Error {
	constructor() {
		super('NotBaseTenantException');
		this.name = 'NotBaseTenantException';
	}
}