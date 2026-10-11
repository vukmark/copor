export class EmptyNotificationTokenException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'EmptyNotificationTokenException';
	}
}
