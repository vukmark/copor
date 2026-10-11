import {ValidateDeleteRoleRepo}
	from '@copor/core/domain/Components/Role/repository/ValidateDeleteRoleRepo';
import {RoleKyselyHelper} from '@copor/core/client/Components/Role/repositoryHelper/RoleKyselyHelper';

export class KyselyDeleteRoleValidatorStorageRepo implements ValidateDeleteRoleRepo {
	isDefaultRoleForRoleType(roleId: string | undefined): Promise<boolean> {
		return RoleKyselyHelper.isDefaultRoleForRoleType(roleId);
	}
	entityHasReferences(id: string): Promise<false | {tableName: string;}> {
		return RoleKyselyHelper.hasRoleReferences(id);
	}
	isInvalidRole(roleId: string): Promise<boolean> {
		return RoleKyselyHelper.isInvalidRole(roleId);
	}
}