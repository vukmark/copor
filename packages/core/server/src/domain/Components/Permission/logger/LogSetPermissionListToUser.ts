import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class LogSetPermissionListToUser extends TypedLogger<LogDataForSetPermissionListToUser> {
	getType(): string {
		return 'setPermissionListToUser';
	}
}

export interface LogDataForSetPermissionListToUser {
	userId: string;
	permissionList: ScopedPermission[];
}