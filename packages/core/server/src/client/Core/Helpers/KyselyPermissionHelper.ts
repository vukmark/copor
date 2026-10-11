import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {db} from '@copor/core/client/AppDataSource';
import {TenantKyselyHelper} from '@copor/core/client/Components/Tenant/repositoryHelper/TenantKyselyHelper';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionScope, scopePriority} from '@copor/core/domain/Core/enum/PermissionScope';
import {KyselyUserPermissionCacheHelper} from '@copor/core/client/Core/Helpers/KyselyUserPermissionCacheHelper';

export class KyselyPermissionHelper {
	public static async getPermission(userId: string, permissionType: PermissionType): Promise<ScopedPermission> {
		let cachedPermission = await this.getCachedPermission(userId, permissionType);

		if (cachedPermission)
			return cachedPermission;
		await KyselyUserPermissionCacheHelper.rebuildUser(userId);
		cachedPermission = await this.getCachedPermission(userId, permissionType);
		if (cachedPermission)
			return cachedPermission;

		return {
			permissionType,
			scope: PermissionScope.ALL,
			effect: PermissionEffect.DENY
		};
	}

	public static async calculatePermission(userId: string, permissionType: PermissionType): Promise<ScopedPermission> {
		const userPermission = await this.getUserPermission(userId, permissionType);
		const userGroupsOfUser = await this.getUserGroupsOfUser(userId);
		const userGroupPermissionList = await this.getUserGroupPermissionList(userGroupsOfUser, permissionType);
		const groupPermission = this.resolvePermission(userGroupPermissionList);
		const rolePermission = await this.getRolePermission(userId, permissionType);

		return this.resolveAcrossLevels([userPermission, groupPermission, rolePermission]) ?? {
			permissionType,
			scope: PermissionScope.ALL,
			effect: PermissionEffect.DENY
		};
	}

	// DENY at any level always wins; otherwise the first (most specific) entry in `levels` wins.
	public static resolveAcrossLevels(
		levels: (ScopedPermission | null | undefined)[]
	): ScopedPermission | null {
		const definedLevels = levels.filter((permission): permission is ScopedPermission => !!permission);
		const deny = definedLevels.find((permission) => permission.effect === PermissionEffect.DENY);

		if (deny)
			return deny;

		return definedLevels[0] ?? null;
	}

	// Same tenant/organization as the given user (used for TENANT-scoped relationship checks).
	public static async isInSameTenant(actorId: string, userId: string): Promise<boolean> {
		if (actorId === userId)
			return true;
		const actorTenants = await TenantKyselyHelper.getTenantListForUser(actorId);
		const userTenants = await TenantKyselyHelper.getTenantListForUser(userId);

		return actorTenants.some((tenantId) => userTenants.includes(tenantId));
	}

	public static async isInTenant(actorId: string, tenantId: string): Promise<boolean> {
		const actorTenants = await TenantKyselyHelper.getTenantListForUser(actorId);

		return actorTenants.includes(tenantId);
	}

	public static async getAllPermissionsForUser(userId: string): Promise<ScopedPermission[]> {
		let cachedPermissions = await this.getUserCachedPermissions(userId);

		if (cachedPermissions.length == 0) {
			await KyselyUserPermissionCacheHelper.rebuildUser(userId);
			cachedPermissions = await this.getUserCachedPermissions(userId);
		}


		return cachedPermissions;
	}

	public static resolvePermission(
		permissionList: ScopedPermission[]
	): ScopedPermission | null {
		if (permissionList.length === 0)
			return null;

		const denyPermissions = permissionList.filter(
			(permission) => permission.effect === PermissionEffect.DENY
		);

		if (denyPermissions.length > 0) {
			return denyPermissions.reduce(
				(strongest, current) => {
					if (this.getScopePriority(current.scope) > this.getScopePriority(strongest.scope))
						return current;
					return strongest;
				}
			);
		}

		const allowPermissions = permissionList.filter(
			(permission) => permission.effect === PermissionEffect.ALLOW
		);

		if (allowPermissions.length > 0) {
			return allowPermissions.reduce(
				(strongest, current) => {
					if (this.getScopePriority(current.scope) > this.getScopePriority(strongest.scope))
						return current;
					return strongest;
				}
			);
		}

		return null;
	}
	private static async getCachedPermission(userId: string, permissionType: PermissionType) {
		return await db
			.selectFrom('userPermissionCache')
			.select([
				'permissionType',
				'scope',
				'effect'
			])
			.where('userId', '=', userId)
			.where('permissionType', '=', permissionType)
			.executeTakeFirst();
	}
	private static async getUserGroupsOfUser(userId: string) {
		return await db
			.selectFrom('userGroupUserMap')
			.select('userGroupId')
			.where('userId', '=', userId)
			.execute();
	}
	private static async getUserCachedPermissions(userId: string) {
		return await db.selectFrom('userPermissionCache')
			.select([
				'permissionType',
				'effect',
				'scope'
			])
			.where('userId', '=', userId)
			.execute();
	}

	private static async getRolePermission(userId: string, permissionType: PermissionType) {
		return await db
			.selectFrom('user as u')
			.innerJoin('rolePermission as rp', 'rp.roleId', 'u.roleId')
			.select([
				'rp.permissionType as permissionType',
				'rp.scope as scope',
				'rp.effect as effect'
			])
			.where('u.id', '=', userId)
			.where('rp.permissionType', '=', permissionType)
			.where('rp.effect', '!=', PermissionEffect.INHERIT)
			.executeTakeFirst();
	}

	private static async getUserGroupPermissionList(userGroupsOfUser: {userGroupId: string}[], permissionType: PermissionType) {
		const userGroupPermissionList: ScopedPermission[] = [];

		for (const userGroup of userGroupsOfUser) {
			const permission = await db
				.selectFrom('userGroupClosure as ugc')
				.innerJoin(
					'userGroupPermission as ugp',
					'ugp.userGroupId',
					'ugc.ancestorId'
				)
				.select([
					'ugp.permissionType',
					'ugp.scope',
					'ugp.effect'
				])
				.where('ugc.descendantId', '=', userGroup.userGroupId)
				.where('ugp.permissionType', '=', permissionType)
				.where('ugp.effect', '!=', PermissionEffect.INHERIT)
				.orderBy('ugc.depth', 'asc')
				.executeTakeFirst();

			if (permission)
				userGroupPermissionList.push(permission);
		}
		return userGroupPermissionList;
	}
	private static async getUserPermission(userId: string, permissionType: PermissionType) {
		return await db
			.selectFrom('user as u')
			.innerJoin('userPermission as up', 'up.userId', 'u.id')
			.select([
				'up.permissionType as permissionType',
				'up.scope as scope',
				'up.effect as effect'
			])
			.where('u.id', '=', userId)
			.where('up.permissionType', '=', permissionType)
			.where('up.effect', '!=', PermissionEffect.INHERIT)
			.executeTakeFirst();
	}

	private static getScopePriority(
		scope: PermissionScope
	): number {
		return scopePriority[scope];
	}
}
