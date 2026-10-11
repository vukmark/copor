import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class LogSetPermissionListToRole extends TypedLogger<LogDataForSetPermissionListToRole> {
	getType(): string {
		return 'setPermissionListToRole';
	}
}

export interface LogDataForSetPermissionListToRole {
	roleId: string;
	permissionList: ScopedPermission[];
}