import {ValidateGetUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateGetUserGroupRepo';

export class FakeGetUserGroupValidatorStorageRepo implements ValidateGetUserGroupRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
