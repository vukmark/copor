import {GetAllPermissionsForUserRepo} from '@copor/core/domain/Components/Permission/repository/GetAllPermissionsForUserRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';

export class KyselyGetUserCompletePermissionListInteractorRepo implements GetAllPermissionsForUserRepo {
	list(userId: string): Promise<ScopedPermission[]> {
		return KyselyPermissionHelper.getAllPermissionsForUser(userId);
	}
}
