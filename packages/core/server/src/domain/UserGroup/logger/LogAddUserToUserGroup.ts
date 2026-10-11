import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForAddUserToUserGroup {
	userId: string;
	userGroupId: string;
}

export class LogAddUserToUserGroup extends TypedLogger<LogDataForAddUserToUserGroup> {
	getType(): string {
		return 'addUserToUserGroup';
	}
}