import {ScopedPermission} from '../interactor/dto/SetPermissionListToRoleDTO';

export interface GetUserGroupPermissionListRepo {
	list(roleId: string): Promise<ScopedPermission[]>;
}