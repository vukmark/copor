import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface CheckRolePermissionDependenciesDTO {
	roleId: string;
	actorId: string;
	desiredPermissionList: ScopedPermission[];
}
