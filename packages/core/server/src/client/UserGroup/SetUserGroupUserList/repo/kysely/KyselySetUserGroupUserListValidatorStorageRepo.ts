import {ValidateSetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/ValidateSetUserGroupUserListRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';
import {db} from '@copor/core/client/AppDataSource';

export class KyselySetUserGroupUserListValidatorStorageRepo implements ValidateSetUserGroupUserListRepo {
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(userGroupId);
	}
	async isUserGroupSpecial(groupId: string | undefined): Promise<boolean> {
		if (!groupId)
			return true;
		const userGroup = await db.selectFrom('userGroup')
			.selectAll()
			.where('userGroup.id', '=', groupId)
			.executeTakeFirst();

		if (!userGroup)
			return true;

		return userGroup.isSpecial;
	}
}