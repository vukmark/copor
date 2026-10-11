import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface ValidateSetPermissionListToRoleDTO {
	roleId: string;
	permissionList: ScopedPermission[];
	actorId: string;
}