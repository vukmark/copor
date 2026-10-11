import {db} from '@copor/core/client/AppDataSource';
import {SetPermissionListToUserRepo} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToUserRepo';
import {SetPermissionListToUserDTO} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToUserDTO';
import {KyselyUserPermissionCacheHelper} from '@copor/core/client/Core/Helpers/KyselyUserPermissionCacheHelper';
import {Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';

export class KyselySetPermissionListToUserInteractorRepo
implements SetPermissionListToUserRepo {
	async save(saveDTO: SetPermissionListToUserDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const {userId, permissionList} = saveDTO;

			await this.deleteOldPermissions(trx, userId);

			if (permissionList.length > 0) {
				await this.saveNewPermissions(trx, permissionList, userId);
			}
		});
		await KyselyUserPermissionCacheHelper.deleteCacheForUsers([saveDTO.userId]);
	}

	private async saveNewPermissions(trx: Transaction<DB>, permissionList: ScopedPermission[], userId: string) {
		await trx
			.insertInto('userPermission')
			.values(
				permissionList.map((p) => ({
					userId,
					permissionType: p.permissionType,
					scope: p.scope,
					effect: p.effect
				}))
			)
			.execute();
	}

	private async deleteOldPermissions(trx: Transaction<DB>, userId: string) {
		await trx
			.deleteFrom('userPermission')
			.where('userId', '=', userId)
			.execute();
	}
}
