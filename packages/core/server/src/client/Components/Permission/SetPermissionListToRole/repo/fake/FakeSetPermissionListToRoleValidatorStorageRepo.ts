import {
	ValidateSetPermissionListToRoleRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToRoleRepo';

export class FakeSetPermissionListToRoleValidatorStorageRepo implements ValidateSetPermissionListToRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
