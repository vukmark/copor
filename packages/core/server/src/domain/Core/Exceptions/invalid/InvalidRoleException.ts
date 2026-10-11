export class InvalidRoleException extends Error {
	constructor() {
		super('InvalidRoleException');
		this.name = 'InvalidRoleException';
	}
}