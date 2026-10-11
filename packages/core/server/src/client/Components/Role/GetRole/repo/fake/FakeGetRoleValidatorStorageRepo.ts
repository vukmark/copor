import {ValidateGetRoleRepo} from '@copor/core/domain/Components/Role/repository/ValidateGetRoleRepo';

export class FakeGetRoleValidatorStorageRepo implements ValidateGetRoleRepo {
	isInvalidRole(roleId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
