import {AddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/AddUserToUserGroupRepo';

export class FakeAddUserToUserGroupInteractorRepo implements AddUserToUserGroupRepo {
	add(userId: string, groupId: string): Promise<void> {
		return Promise.resolve();
	}
}