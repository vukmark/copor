import {ValidateUpdateRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateUpdateRoleRepo';

export class FakeUpdateRoleValidatorStorageRepo implements ValidateUpdateRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
