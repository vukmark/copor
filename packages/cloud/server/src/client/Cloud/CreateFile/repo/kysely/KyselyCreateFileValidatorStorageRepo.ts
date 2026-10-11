import {cloudMaxFileSizeMb} from '@copor/cloud/client/Cloud/CloudConfig';
import {ValidateCreateFileRepo} from '@copor/cloud/domain/Cloud/repository/ValidateCreateFileRepo';
import {KyselyVisibleUsersHelper} from '@copor/core/client/User/VisibleUsers/KyselyVisibleUsersHelper';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {db} from '@copor/core/client/AppDataSource';
import {UserGroupKyselyHelper} from '@copor/core/client/UserGroup/repositoryHelper/UserGroupKyselyHelper';

export class KyselyCreateFileValidatorStorageRepo implements ValidateCreateFileRepo {
	private appContext: AppContext;
	constructor(appContext: AppContext) {
		this.appContext = appContext;
	}

	async isUserNotInUserGroup(userId: string | undefined, userGroupId: string | undefined): Promise<boolean> {
		if (!userId || !userGroupId)
			return true;
		const isUserInUserGroup = await db
			.selectFrom('userGroupUserMap as map')
			.select('userGroupId')
			.where('userId', '=', userId)
			.where('userGroupId', '=', userGroupId)
			.executeTakeFirst();

		return !isUserInUserGroup;
	}

	isInvalidUserGroup(id: string | undefined): Promise<boolean> {
		return UserGroupKyselyHelper.isInvalidUserGroup(id);
	}

	isInvalidFileSize(file: Buffer | undefined): Promise<boolean> {
		if (!file)
			return Promise.resolve(true);
		const maxFileSize = cloudMaxFileSizeMb(this.appContext);

		if (file.length < maxFileSize * 1024 * 1024)
			return Promise.resolve(false);
		return Promise.resolve(true);
	}

	isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		return KyselyVisibleUsersHelper.isUserNotVisible(actorId, userId, permissionType, activeOnly);
	}
}
