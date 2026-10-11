import {ValidateDeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateDeleteUserGroupRepo';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyDeleteUserGroupValidatorStorageRepo implements ValidateDeleteUserGroupRepo {
	async doesUserGroupHaveChildren(userGroupId: string | undefined): Promise<boolean> {
		if (!userGroupId)
			return true;
		const descendant = await db.selectFrom('userGroupClosure')
			.selectAll()
			.where('ancestorId', '=', userGroupId)
			.where('depth', '>', 0)
			.executeTakeFirst();

		return descendant != undefined;
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
	isInvalidUserGroup(id: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(id);
	}
	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return UserGroupKyselyHelper.userGroupHasReferences(id);
	}
}
