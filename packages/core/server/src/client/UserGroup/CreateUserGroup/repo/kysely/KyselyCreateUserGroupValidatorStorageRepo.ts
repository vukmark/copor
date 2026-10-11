import {ValidateCreateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateCreateUserGroupRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselyCreateUserGroupValidatorStorageRepo implements ValidateCreateUserGroupRepo {
	async isInvalidUserGroup(userGroupId: string | undefined): Promise<boolean> {
		if (!userGroupId)
			return true;
		const userGroup = await db.selectFrom('userGroup')
			.selectAll()
			.where('id', '=', userGroupId)
			.executeTakeFirst();

		return !userGroup;
	}
}
