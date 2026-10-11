import {db} from '@copor/core/client/AppDataSource';
import {SetPermissionListToRoleRepo} from '@copor/core/domain/Components/Permission/repository/SetPermissionListToRoleRepo';
import {
	ScopedPermission,
	SetPermissionListToRoleDTO
} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {KyselyUserPermissionCacheHelper} from '@copor/core/client/Core/Helpers/KyselyUserPermissionCacheHelper';
import {Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';

export class KyselySetPermissionListToRoleInteractorRepo
implements SetPermissionListToRoleRepo {
	async save(saveDTO: SetPermissionListToRoleDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			const {roleId, permissionList} = saveDTO;

			await this.deleteExistingPermissions(trx, roleId, permissionList);

			if (permissionList.length > 0) {
				await this.saveNewPermissions(trx, permissionList, roleId);
			}
		});
		const roleUsers = await db.selectFrom('user')
			.select('id')
			.where('roleId', '=', saveDTO.roleId)
			.execute();

		await KyselyUserPermissionCacheHelper.deleteCacheForUsers(roleUsers.map((user) => user.id));
	}

	private saveNewPermissions(trx: Transaction<DB>, permissionList: ScopedPermission[], roleId: string) {
		return trx
			.insertInto('rolePermission')
			.values(
				permissionList.map((p) => ({
					roleId,
					permissionType: p.permissionType,
					scope: p.scope,
					effect: p.effect
				}))
			)
			.execute();
	}

	private async deleteExistingPermissions(
		trx: Transaction<DB>,
		roleId: string,
		permissionList: ScopedPermission[]
	) {
		if (permissionList.length === 0) {
			return;
		}

		await trx
			.deleteFrom('rolePermission')
			.where('roleId', '=', roleId)
			.where(
				'permissionType',
				'in',
				permissionList.map((p) => p.permissionType)
			)
			.execute();
	}
}
