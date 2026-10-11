import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {getAllPermissionTypes} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {db} from '@copor/core/client/AppDataSource';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {GetUserGroupPermissionListRepo} from '@copor/core/domain/Components/Permission/repository/GetUserGroupPermissionListRepo';

export class KyselyGetUserGroupPermissionListInteractorRepo implements GetUserGroupPermissionListRepo {
	async list(userGroupId: string): Promise<ScopedPermission[]> {
		const [ownRows, effectiveByType] = await Promise.all([
			db
				.selectFrom('userGroupPermission')
				.select([
					'permissionType',
					'scope',
					'effect'
				])
				.where('userGroupPermission.userGroupId', '=', userGroupId)
				.execute(),
			this.getEffectiveAncestorPermissions(userGroupId)
		]);

		const ownByType = new Map<PermissionType, ScopedPermission>(
			ownRows.map((row) => {
				const permissionType = row.permissionType;
				const effectivePermission = row.effect === PermissionEffect.INHERIT
					? effectiveByType.get(permissionType)
					: undefined;

				return [
					permissionType,
					{
						permissionType,
						scope: row.scope,
						effect: row.effect,
						... effectivePermission ? {effectiveEffect: effectivePermission.effect} : {}
					}
				];
			})
		);

		// A permission type with no row for this group has never had an explicit
		// override saved -- that's implicitly Inherit, not "doesn't exist". Every
		// defined permission type must be represented here, or it's invisible to
		// search/browse and can never be granted.
		const allPermissionTypes = getAllPermissionTypes();

		return allPermissionTypes.map((permissionType) => {
			const own = ownByType.get(permissionType);

			if (own)
				return own;

			const effectivePermission = effectiveByType.get(permissionType);

			return {
				permissionType,
				scope: PermissionScope.ALL,
				effect: PermissionEffect.INHERIT,
				... effectivePermission ? {effectiveEffect: effectivePermission.effect} : {}
			};
		});
	}

	// For every permission type, the nearest ancestor (including this group
	// itself, though that's irrelevant here since callers only look this up
	// for rows already known to be INHERIT) with an explicit Allow/Deny.
	// `userGroupClosure` holds the full ancestor chain per group, so this is
	// one query, no recursion.
	private async getEffectiveAncestorPermissions(userGroupId: string): Promise<Map<PermissionType, ScopedPermission>> {
		const rows = await db
			.selectFrom('userGroupClosure as ugc')
			.innerJoin('userGroupPermission as ugp', 'ugp.userGroupId', 'ugc.ancestorId')
			.select([
				'ugp.permissionType',
				'ugp.scope',
				'ugp.effect',
				'ugc.depth'
			])
			.where('ugc.descendantId', '=', userGroupId)
			.where('ugp.effect', '!=', PermissionEffect.INHERIT)
			.orderBy('ugc.depth', 'asc')
			.execute();

		const nearestByType = new Map<PermissionType, ScopedPermission>();

		for (const row of rows) {
			const permissionType = row.permissionType;

			if (!nearestByType.has(permissionType)) {
				nearestByType.set(permissionType, {
					permissionType,
					scope: row.scope,
					effect: row.effect
				});
			}
		}

		return nearestByType;
	}
}
