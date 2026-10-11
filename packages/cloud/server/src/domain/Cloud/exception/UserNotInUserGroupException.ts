export class UserNotInUserGroupException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'UserNotInUserGroupException';
	}
}
