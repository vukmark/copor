import {ValidateUpdateRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateUpdateRoleRepo';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';

export class KyselyUpdateRoleValidatorStorageRepo implements ValidateUpdateRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return RoleKyselyHelper.isInvalidRole(roleId);
	}
}
