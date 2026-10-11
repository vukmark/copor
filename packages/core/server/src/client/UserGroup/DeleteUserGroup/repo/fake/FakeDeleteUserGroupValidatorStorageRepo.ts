import {ValidateDeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateDeleteUserGroupRepo';

export class FakeDeleteUserGroupValidatorStorageRepo implements ValidateDeleteUserGroupRepo {
	doesUserGroupHaveChildren(userGroupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isUserGroupSpecial(groupId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
	isInvalidUserGroup(): Promise<boolean> {
		return Promise.resolve(false);
	}
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
}