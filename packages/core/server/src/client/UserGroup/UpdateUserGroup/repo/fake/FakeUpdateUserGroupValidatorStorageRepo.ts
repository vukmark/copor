import {
	ValidateUpdateUserGroupRepo
} from '@copor/core/domain/UserGroup/repository/ValidateUpdateUserGroupRepo';

export class FakeUpdateUserGroupValidatorStorageRepo implements ValidateUpdateUserGroupRepo {
	public isInvalidUserGroup(UserGroupId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}
