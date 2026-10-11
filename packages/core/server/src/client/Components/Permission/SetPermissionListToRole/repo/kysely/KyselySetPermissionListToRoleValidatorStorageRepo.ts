import {ValidateSetPermissionListToRoleRepo}
	from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToRoleRepo';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';

export class KyselySetPermissionListToRoleValidatorStorageRepo implements ValidateSetPermissionListToRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return RoleKyselyHelper.isInvalidRole(roleId);
	}
}
