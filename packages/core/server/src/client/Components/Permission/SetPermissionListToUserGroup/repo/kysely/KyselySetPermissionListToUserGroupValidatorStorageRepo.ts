import {
	ValidateSetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserGroupRepo';
import {db} from '@copor/core/client/AppDataSource';

export class KyselySetPermissionListToUserGroupValidatorStorageRepo implements ValidateSetPermissionListToUserGroupRepo {
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
