import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface SetPermissionListToUserGroupReqBodyDTO {
	userGroupId: string;
	permissionList: ScopedPermission[];
}