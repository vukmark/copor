import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface SetPermissionListToUserReqBodyDTO {
	userId: string;
	permissionList: ScopedPermission[];
}