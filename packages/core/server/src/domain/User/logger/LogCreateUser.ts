import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogCreateUser extends TypedLogger<LogDataForCreateUser> {
	public getType(): string {
		return 'createUser';
	}
}

export interface LogDataForCreateUser {
	username: string;
	password: string;
	email: string;
	isActive: boolean;
}