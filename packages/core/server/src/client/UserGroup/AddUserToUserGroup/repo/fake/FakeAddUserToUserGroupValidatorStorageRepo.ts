import {ValidateAddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateAddUserToUserGroupRepo';

export class FakeAddUserToUserGroupValidatorStorageRepo implements ValidateAddUserToUserGroupRepo {
	isUserGroupSpecial(groupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}