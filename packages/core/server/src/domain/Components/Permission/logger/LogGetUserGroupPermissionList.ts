import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetUserGroupPermissionList {
	userGroupId: string;
}

export class LogGetUserGroupPermissionList extends TypedLogger<LogDataForGetUserGroupPermissionList> {
	getType(): string {
		return 'getUserGroupPermissionList';
	}
}
