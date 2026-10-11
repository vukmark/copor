import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface ValidateSetPermissionListToUserDTO {
	userId: string;
	permissionList: ScopedPermission[];
	actorId: string;
}