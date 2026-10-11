import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {getAllPermissionTypes} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {SaveUserGroupDTO} from '@copor/core/domain/UserGroup/interactor/dto/SaveUserGroupDTO';
import {db} from '@copor/core/client/AppDataSource';
import {Transaction} from 'kysely';
import {DB} from '@copor/core/client/types/db';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export class KyselyCreateUserGroupInteractorRepo implements SaveItem<SaveUserGroupDTO> {
	async save(saveDTO: SaveUserGroupDTO): Promise<void> {
		await db.transaction().execute(async (trx) => {
			await this.createUserGroup(trx, saveDTO);

			await this.insertSelfReferenceInClosureTable(trx, saveDTO);

			if (saveDTO.parentUserGroupId) {
				const parentClosureList = await this.getParentClosureList(trx, saveDTO);

				if (parentClosureList.length > 0) {
					await this.insertInheritedClosureList(trx, parentClosureList, saveDTO);
				}
			}
			await this.createDefaultPermissions(trx, saveDTO.id);
		});
	}

	private async insertInheritedClosureList(
		trx: Transaction<DB>,
		parentClosureList: {ancestorId: string, depth: number}[],
		saveDTO: SaveUserGroupDTO
	) {
		await trx
			.insertInto('userGroupClosure')
			.values(
				parentClosureList.map((row) => ({
					id: crypto.randomUUID(),
					ancestorId: row.ancestorId,
					descendantId: saveDTO.id,
					depth: row.depth + 1
				}))
			)
			.execute();
	}

	private async getParentClosureList(trx: Transaction<DB>, saveDTO: SaveUserGroupDTO) {
		return await trx
			.selectFrom('userGroupClosure')
			.select([
				'ancestorId',
				'depth'
			])
			.where(
				'descendantId',
				'=',
				saveDTO.parentUserGroupId!
			)
			.execute();
	}

	private async insertSelfReferenceInClosureTable(trx: Transaction<DB>, saveDTO: SaveUserGroupDTO) {
		await trx
			.insertInto('userGroupClosure')
			.values({
				id: crypto.randomUUID(),
				ancestorId: saveDTO.id,
				descendantId: saveDTO.id,
				depth: 0
			})
			.execute();
	}

	private async createUserGroup(trx: Transaction<DB>, saveDTO: SaveUserGroupDTO) {
		await trx
			.insertInto('userGroup')
			.values({
				id: saveDTO.id,
				name: saveDTO.name ?? '',
				isSpecial: false
			})
			.execute();
	}
	private async createDefaultPermissions(
		trx: Transaction<DB>,
		userGroupId: string
	): Promise<void> {
		const permissionTypes = getAllPermissionTypes();

		await trx
			.insertInto('userGroupPermission')
			.values(
				permissionTypes.map((permissionType) => ({
					userGroupId,
					permissionType,
					scope: PermissionScope.ALL,
					effect: PermissionEffect.INHERIT
				}))
			)
			.execute();
	}
}