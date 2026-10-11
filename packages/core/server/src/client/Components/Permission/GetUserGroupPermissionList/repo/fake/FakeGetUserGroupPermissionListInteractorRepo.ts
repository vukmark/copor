
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {GetUserGroupPermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetUserGroupPermissionListRepo';

export class FakeGetUserGroupPermissionListInteractorRepo implements GetUserGroupPermissionListRepo {
	list(roleId: string): Promise<ScopedPermission[]> {
		return Promise.resolve([]);
	}
}
