import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteUser extends TypedLogger<LogDataForDeleteUser> {
	public getType(): string {
		return 'deleteUser';
	}
}

export interface LogDataForDeleteUser {
	deletedUserId: string;
}