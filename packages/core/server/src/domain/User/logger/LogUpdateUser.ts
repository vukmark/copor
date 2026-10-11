import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateUser extends TypedLogger<LogDataForUpdateUser> {
	public getType(): string {
		return 'updateUser';
	}
}

export interface LogDataForUpdateUser {
	id: string;
	username: string;
	password: string;
	email: string;
	isActive: boolean;
}