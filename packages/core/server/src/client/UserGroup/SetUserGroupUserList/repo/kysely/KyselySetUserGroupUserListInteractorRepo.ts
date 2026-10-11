import {SetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/SetUserGroupUserListRepo';
import {db} from '@copor/core/client/AppDataSource';
import {KyselyUserPermissionCacheHelper} from '@copor/core/client/Core/Helpers/KyselyUserPermissionCacheHelper';

export class KyselySetUserGroupUserListInteractorRepo implements SetUserGroupUserListRepo {
	async set(groupId: string, userList: string[]): Promise<void> {
		const oldUserGroupUsers = await db
			.selectFrom('userGroupUserMap')
			.select('userId')
			.where('userGroupId', '=', groupId)
			.execute();

		await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom('userGroupUserMap')
				.where('userGroupId', '=', groupId)
				.execute();

			if (userList.length > 0) {
				await trx
					.insertInto('userGroupUserMap')
					.values(
						userList.map((userId) => ({
							userGroupId: groupId,
							userId
						}))
					)
					.execute();
			}
		});
		await KyselyUserPermissionCacheHelper.deleteCacheForUsers([
			... userList,
			... oldUserGroupUsers.map((user) => user.userId)
		]);
	}
}