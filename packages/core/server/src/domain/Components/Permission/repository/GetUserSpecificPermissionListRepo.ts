import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export interface GetUserSpecificPermissionListRepo {
	list(roleId: string): Promise<ScopedPermission[]>;
}
