import {SetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/SetUserGroupUserListRepo';

export class FakeSetUserGroupUserListInteractorRepo implements SetUserGroupUserListRepo {
	set(groupId: string, userList: string[]): Promise<void> {
		return Promise.resolve();
	}
}