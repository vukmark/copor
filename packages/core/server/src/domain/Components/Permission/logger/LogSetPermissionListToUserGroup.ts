import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class LogSetPermissionListToUserGroup extends TypedLogger<LogDataForSetPermissionListToUserGroup> {
	getType(): string {
		return 'setPermissionListToUserGroup';
	}
}

export interface LogDataForSetPermissionListToUserGroup {
	userGroupId: string;
	permissionList: ScopedPermission[];
}