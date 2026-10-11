import {KyselyUserPermissionRepo} from '@copor/core/client/Core/Repository/ContextualRepository/KyselyUserPermissionRepo';
import {ValidateCanDeleteFileContext} from '@copor/cloud/domain/Cloud/validation/ValidateDeleteFile';
import {db} from '@copor/core/client/AppDataSource';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {SharingType} from '@copor/cloud/domain/Cloud/interactor/dto/SaveFileDTO';

export class KyselyDeleteFileValidatorPermissionRepo extends KyselyUserPermissionRepo<ValidateCanDeleteFileContext> {
	async isAllowed(
		actorId: string,
		permissionType: PermissionType,
		context?: ValidateCanDeleteFileContext
	): Promise<boolean> {
		if (!context)
			return false;

		const file = await db.selectFrom('cloudFile')
			.selectAll()
			.where('id', '=', context.fileId)
			.executeTakeFirst();

		if (file?.sharingType === SharingType.PUBLIC) {
			if (file.createdBy === actorId)
				return true;
			return await this.canDeletePublicFile(context.fileId, actorId);
		}

		if (file?.sharingType === SharingType.USER_GROUP) {
			if (file.createdBy === actorId)
				return true;
			return await this.canDeleteUserGroupFile(context.fileId, actorId);
		}

		return await super.isAllowed(actorId, permissionType, context);
	}

	// A PUBLIC file can be deleted by its uploader (createdBy, checked by the
	// caller) or by the owner of the Public folder it sits in.
	private async canDeletePublicFile(fileId: string, actorId: string): Promise<boolean> {
		const folderOwner = await db
			.selectFrom('fileUserMap')
			.select('userId')
			.where('fileId', '=', fileId)
			.executeTakeFirst();

		return folderOwner?.userId === actorId;
	}

	private async canDeleteUserGroupFile(fileId: string, actorId: string): Promise<boolean> {
		const userGroup = await db
			.selectFrom('fileUserGroupMap')
			.select('userGroupId')
			.where('fileId', '=', fileId)
			.executeTakeFirst();

		if (!userGroup)
			return false;

		const isUserInUserGroup = await db
			.selectFrom('userGroupUserMap')
			.select('userId')
			.where('userId', '=', actorId)
			.where('userGroupId', '=', userGroup.userGroupId)
			.executeTakeFirst();

		return !!isUserInUserGroup;
	}

	protected async getUserIdFromContext(context: ValidateCanDeleteFileContext): Promise<string> {
		const file = await db.selectFrom('cloudFile')
			.selectAll()
			.where('id', '=', context.fileId)
			.executeTakeFirst();

		return file?.createdBy ?? '';
	}
}
