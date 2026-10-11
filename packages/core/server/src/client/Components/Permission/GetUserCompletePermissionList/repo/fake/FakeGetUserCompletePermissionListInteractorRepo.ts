import {GetAllPermissionsForUserRepo} from '@copor/core/domain/Components/Permission/repository/GetAllPermissionsForUserRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {CorePermission} from '@copor/core/domain/Core/Permission/CorePermission';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';


export class FakeGetUserCompletePermissionListInteractorRepo implements GetAllPermissionsForUserRepo {
	list(userId: string): Promise<ScopedPermission[]> {
		return Promise.resolve([
			{
				permissionType: CorePermission.canGetTenantList,
				scope: PermissionScope.ALL,
				effect: PermissionEffect.ALLOW
			}
		]);
	}
}
