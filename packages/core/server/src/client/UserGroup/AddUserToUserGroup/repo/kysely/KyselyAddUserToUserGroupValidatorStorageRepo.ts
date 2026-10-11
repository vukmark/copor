import {ValidateAddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateAddUserToUserGroupRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';
import {UserKyselyHelper} from '@copor/core/client/User/helper/UserKyselyHelper';
import {db} from '@copor/core/client/AppDataSource';


export class KyselyAddUserToUserGroupValidatorStorageRepo implements ValidateAddUserToUserGroupRepo {
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
	isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(userGroupId);
	}
	isNotValidUser(userId: string | undefined): Promise<boolean> {
		return UserKyselyHelper.isNotValidUser(userId);
	}
}