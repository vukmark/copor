
import {
	GetUserSpecificPermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/GetUserSpecificPermissionListRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class FakeGetUserSpecificPermissionListInteractorRepo implements GetUserSpecificPermissionListRepo {
	list(roleId: string): Promise<ScopedPermission[]> {
		return Promise.resolve([]);
	}
}
