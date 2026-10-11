import {GetRolePermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetRolePermissionListRepo';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export class FakeGetRolePermissionListInteractorRepo implements GetRolePermissionListRepo {
	public list(roleId: string): Promise<ScopedPermission[]> {
		return new Promise((resolve) => {
			resolve([{
				permissionType: CorePermission.canArchiveUser,
				scope: PermissionScope.ALL,
				effect: PermissionEffect.ALLOW
			}]);
		});
	}
}
