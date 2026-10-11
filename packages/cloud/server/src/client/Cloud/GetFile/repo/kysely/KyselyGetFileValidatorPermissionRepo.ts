import {ValidateGetFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateGetFile';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionRepository} from '@copor/core/domain/Core/Validations/PermissionRepository';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {db} from '@copor/core/client/AppDataSource';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

export class KyselyGetFileValidatorPermissionRepo implements PermissionRepository<ValidateGetFileContext> {
	async isAllowed(actorId: string, permissionType: PermissionType, context?: ValidateGetFileContext | undefined): Promise<boolean> {
		if (!context)
			return false;
		const permission = await KyselyPermissionHelper.getPermission(actorId, permissionType);

		if (permission.effect == PermissionEffect.DENY)
			return false;
		if (await this.isInUserGroup(context, actorId))
			return true;
		if (await this.isUsersPrivateFile(context, actorId))
			return true;

		return await this.isPublicFile(context, actorId);
	}

	// A PUBLIC file is readable by its uploader (createdBy) and by the owner
	// of the Public folder it sits in (fileUserMap.userId).
	private async isPublicFile(context: ValidateGetFileContext, actorId: string): Promise<boolean> {
		const file = await db
			.selectFrom('cloudFile')
			.select(['createdBy', 'sharingType'])
			.where('id', '=', context.fileId)
			.executeTakeFirst();

		if (!file || file.sharingType !== SharingType.PUBLIC)
			return false;
		if (file.createdBy === actorId)
			return true;

		const folderOwner = await db
			.selectFrom('fileUserMap')
			.select('userId')
			.where('fileId', '=', context.fileId)
			.executeTakeFirst();

		return folderOwner?.userId === actorId;
	}

	private async isUsersPrivateFile(context: ValidateGetFileContext, actorId: string): Promise<boolean> {
		const file = await db
			.selectFrom('cloudFile')
			.selectAll()
			.where('id', '=', context.fileId)
			.executeTakeFirst();

		if (!file)
			return false;
		if (file.sharingType == SharingType.PRIVATE && file.createdBy == actorId)
			return true;
		return false;
	}

	private async isInUserGroup(context: ValidateGetFileContext, actorId: string) {
		const userGroup = await db
			.selectFrom('fileUserGroupMap')
			.select('userGroupId')
			.where('fileId', '=', context.fileId)
			.executeTakeFirst();

		if (userGroup) {
			const isUserGroupMember = await db
				.selectFrom('userGroupUserMap')
				.select('userId')
				.where('userGroupId', '=', userGroup.userGroupId)
				.where('userId', '=', actorId)
				.executeTakeFirst();

			if (isUserGroupMember)
				return true;
		}
		return false;
	}
}
