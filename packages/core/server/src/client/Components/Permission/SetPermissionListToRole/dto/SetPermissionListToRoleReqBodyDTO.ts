import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface SetPermissionListToRoleReqBodyDTO {
	roleId: string;
	permissionList: ScopedPermission[];
}