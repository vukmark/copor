import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetUserPermissionList {
	userId: string;
}

export class LogGetUserSpecificPermissionList extends TypedLogger<LogDataForGetUserPermissionList> {
	getType(): string {
		return 'getUserPermissionList';
	}
}
