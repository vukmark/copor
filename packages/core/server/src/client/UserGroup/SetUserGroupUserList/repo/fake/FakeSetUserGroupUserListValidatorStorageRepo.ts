import {ValidateSetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/ValidateSetUserGroupUserListRepo';

export class FakeSetUserGroupUserListValidatorStorageRepo implements ValidateSetUserGroupUserListRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserGroupSpecial(groupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}