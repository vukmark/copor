import {AddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/AddUserToUserGroupRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyAddUserToUserGroupInteractorRepo implements AddUserToUserGroupRepo {
	async add(userId: string, groupId: string): Promise<void> {
		await db.insertInto('userGroupUserMap')
			.values({
				userId: userId,
				userGroupId: groupId
			})
			.execute();
	}
}