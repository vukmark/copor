import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveRoleDTO} from '@copor/core/domain/Components/Role/interactor/dto/SaveRoleDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TimestampHelper} from '@copor/core/client/Core/Helpers/TimestampHelper';
import {TimestampedEntity} from '@copor/core/client/Core/TimstampedEntity';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export class KyselyCreateRoleInteractorRepo implements SaveItem<SaveRoleDTO> {
	async save(saveDTO: SaveRoleDTO): Promise<void> {
		const timestamp: TimestampedEntity = TimestampHelper.getTimestampForCreate(saveDTO.actorId);

		await db.transaction().execute(async(trx) => {
			await this.createRole(trx, saveDTO, timestamp);

			const permissionsOfDefaultRoleForRoleType = await this.getPermissionsOfDefaultRoleForRoleType(trx, saveDTO);

			await this.assignPermissionsToNewRole(trx, permissionsOfDefaultRoleForRoleType, saveDTO);
		});
	}

	private async assignPermissionsToNewRole(
		trx: typeof db,
		permissionsOfDefaultRoleForRoleType: PermissionArrayDTO[],
		saveDTO: SaveRoleDTO) {
		if (!permissionsOfDefaultRoleForRoleType.length)
			return;
		await trx.insertInto('rolePermission')
			.values(permissionsOfDefaultRoleForRoleType.map((permission) => {
				return {
					roleId: saveDTO.id,
					permissionType: permission.permissionType,
					scope: permission.scope,
					effect: permission.effect
				};
			}))
			.execute();
	}
	private async getPermissionsOfDefaultRoleForRoleType(trx: typeof db, saveDTO: SaveRoleDTO) {
		return await trx
			.selectFrom('role as r')
			.innerJoin('rolePermission as rp', 'rp.roleId', 'r.id')
			.select([
				'rp.permissionType',
				'rp.scope',
				'rp.effect'
			])
			.where('r.type', '=', saveDTO.type)
			.where('r.isDefaultForRoleType', '=', true)
			.execute();
	}

	private async createRole(trx: typeof db, saveDTO: SaveRoleDTO, timestamp: TimestampedEntity) {
		await trx
			.insertInto('role')
			.values({
				id: saveDTO.id,
				type: saveDTO.type,
				name: saveDTO.name,
				isDefaultForRoleType: false,
				... timestamp
			})
			.execute();
	}
}
interface PermissionArrayDTO {
	permissionType: PermissionType;
	scope: PermissionScope;
	effect: PermissionEffect
}