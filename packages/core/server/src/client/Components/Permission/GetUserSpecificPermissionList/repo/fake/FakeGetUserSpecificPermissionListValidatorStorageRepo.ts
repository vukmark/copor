import {ValidateGetUserSpecificPermissionListRepo}
	from '@copor/core/domain/Components/Permission/repository/ValidateGetUserSpecificPermissionListRepo';

export class FakeGetUserSpecificPermissionListValidatorStorageRepo implements ValidateGetUserSpecificPermissionListRepo {
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
