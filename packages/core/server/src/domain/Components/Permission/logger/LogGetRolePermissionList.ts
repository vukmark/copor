import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetRolePermissionList {
	roleId: string;
}

export class LogGetRolePermissionList extends TypedLogger<LogDataForGetRolePermissionList> {
	getType(): string {
		return 'getRolePermissionList';
	}
}
