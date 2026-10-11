import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface ValidateSetPermissionListToUserGroupDTO {
	userGroupId: string;
	permissionList: ScopedPermission[];
	actorId: string;
}