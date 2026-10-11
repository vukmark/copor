import {
	ValidateGetUserGroupPermissionListRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateGetUserGroupPermissionListRepo';

export class FakeGetUserGroupPermissionListValidatorStorageRepo implements ValidateGetUserGroupPermissionListRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
