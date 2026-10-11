import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface SetPermissionListToUserDTO {
	userId: string;
	permissionList: ScopedPermission[];
	actorId: string;
}