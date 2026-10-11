import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface GetRolePermissionListRepo {
	list(roleId: string): Promise<ScopedPermission[]>;
}
