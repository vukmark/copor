import {ValidateCreateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateCreateUserGroupRepo';

export class FakeCreateUserGroupValidatorStorageRepo implements ValidateCreateUserGroupRepo {
	isInvalidUserGroup(): Promise<boolean> {
		return Promise.resolve(false);
	}
}