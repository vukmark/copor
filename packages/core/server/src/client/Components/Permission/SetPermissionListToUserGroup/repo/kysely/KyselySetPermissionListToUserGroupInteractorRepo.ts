import {db} from '@copor/core/client/AppDataSource';
import {
	SetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserGroupRepo';
import {
	SetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserGroupDTO';
import {Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';
import {KyselyUserPermissionCacheHelper} from '@copor/core/client/Core/Helpers/KyselyUserPermissionCacheHelper';

export class KyselySetPermissionListToUserGroupInteractorRepo
implements SetPermissionListToUserGroupRepo {
	async save(saveDTO: SetPermissionListToUserGroupDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await this.deleteExistingPermissions(trx, saveDTO);

			if (saveDTO.permissionList.length === 0) {
				return;
			}

			await this.insertNewPermissions(trx, saveDTO);
		});
		const userGroupMembers = await db
			.selectFrom('userGroupUserMap')
			.select('userId')
			.where('userGroupId', '=', saveDTO.userGroupId)
			.execute();

		await KyselyUserPermissionCacheHelper.deleteCacheForUsers(userGroupMembers.map((user) => user.userId));
	}

	private async insertNewPermissions(trx: Transaction<DB>, saveDTO: SetPermissionListToUserGroupDTO) {
		await trx
			.insertInto('userGroupPermission')
			.values(
				saveDTO.permissionList.map((permission) => ({
					userGroupId: saveDTO.userGroupId,
					permissionType: permission.permissionType,
					scope: permission.scope,
					effect: permission.effect
				}))
			)
			.execute();
	}

	private async deleteExistingPermissions(
		trx: Transaction<DB>,
		saveDTO: SetPermissionListToUserGroupDTO
	) {
		if (saveDTO.permissionList.length === 0) {
			return;
		}

		await trx
			.deleteFrom('userGroupPermission')
			.where('userGroupId', '=', saveDTO.userGroupId)
			.where(
				'permissionType',
				'in',
				saveDTO.permissionList.map((p) => p.permissionType)
			)
			.execute();
	}
}
