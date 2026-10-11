import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {getAllPermissionTypes} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {db} from '@copor/core/client/AppDataSource';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {GetRolePermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetRolePermissionListRepo';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export class KyselyGetRolePermissionListInteractorRepo implements GetRolePermissionListRepo {
	async list(roleId: string): Promise<ScopedPermission[]> {
		const result = await db
			.selectFrom('rolePermission')
			.select([
				'permissionType',
				'scope',
				'effect'
			])
			.where('rolePermission.roleId', '=', roleId)
			.execute();

		const permissionByType = new Map<PermissionType, ScopedPermission>(
			result.map((row) => [
				row.permissionType,
				{
					permissionType: row.permissionType,
					scope: row.scope,
					effect: row.effect
				}
			])
		);

		// A permission type with no row for this role has never had an explicit
		// override saved -- that's implicitly Inherit, not "doesn't exist". Every
		// defined permission type must be represented here, or it's invisible to
		// search/browse and can never be granted.
		const allPermissionTypes = getAllPermissionTypes();

		return allPermissionTypes.map((permissionType) => permissionByType.get(permissionType) ?? {
			permissionType,
			scope: PermissionScope.ALL,
			effect: PermissionEffect.INHERIT
		});
	}
}
