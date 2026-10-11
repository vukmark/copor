export class PasswordRecentlyUsedException extends Error {
	constructor() {
		super('PasswordRecentlyUsedException');
		this.name = 'PasswordRecentlyUsedException';
	}
}
