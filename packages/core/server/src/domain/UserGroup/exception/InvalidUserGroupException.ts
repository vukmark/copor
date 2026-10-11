export class InvalidUserGroupException extends Error {
	constructor(message?: string) {
		super(message);
		this.name = 'InvalidUserGroupException';
	}
}

