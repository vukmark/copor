import {ValidateGetRolePermissionListRepo}
	from '@copor/core/domain/Components/Permission/repository/ValidateGetRolePermissionListRepo';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';

export class KyselyGetRolePermissionListValidatorStorageRepo implements ValidateGetRolePermissionListRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return RoleKyselyHelper.isInvalidRole(roleId);
	}
}
