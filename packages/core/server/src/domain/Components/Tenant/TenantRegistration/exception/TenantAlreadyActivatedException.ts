export class TenantAlreadyActivatedException extends Error {
	constructor() {
		super('TenantAlreadyActivatedException');
		this.name = 'TenantAlreadyActivatedException';
	}
}