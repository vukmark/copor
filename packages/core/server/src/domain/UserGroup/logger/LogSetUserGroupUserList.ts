import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForSetUserGroupUserList {
	userGroupId: string;
	userList: string[];
}

export class LogSetUserGroupUserList extends TypedLogger<LogDataForSetUserGroupUserList> {
	getType(): string {
		return 'setUserGroupUserList';
	}
}