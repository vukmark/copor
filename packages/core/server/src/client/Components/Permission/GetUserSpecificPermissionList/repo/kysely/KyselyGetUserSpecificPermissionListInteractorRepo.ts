import {GetUserSpecificPermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetUserSpecificPermissionListRepo';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';

export class KyselyGetUserSpecificPermissionListInteractorRepo implements GetUserSpecificPermissionListRepo {
	list(userId: string): Promise<ScopedPermission[]> {
		return KyselyPermissionHelper.getAllPermissionsForUser(userId);
	}
}
