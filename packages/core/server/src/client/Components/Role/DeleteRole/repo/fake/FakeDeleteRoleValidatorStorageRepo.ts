import {ValidateDeleteRoleRepo}
	from '@copor/core/domain/Components/Role/repository/ValidateDeleteRoleRepo';

export class FakeDeleteRoleValidatorStorageRepo implements ValidateDeleteRoleRepo {
	isDefaultRoleForRoleType(roleId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(id: string): Promise<false | {tableName: string;}> {
		return Promise.resolve(false);
	}
	isInvalidRole(roleId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}