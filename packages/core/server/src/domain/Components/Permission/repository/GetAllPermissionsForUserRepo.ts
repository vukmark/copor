import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface GetAllPermissionsForUserRepo {
	list(userId: string): Promise<ScopedPermission[]>;
}