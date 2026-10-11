import {Kysely, Transaction} from 'kysely';
import {getAllPermissionTypes} from '@copor/core/domain/Core/Permission/PermissionRegistry';
import {ScopedPermission} from '@copor/core/domain/Components/Permission/interactor/dto/SetPermissionListToRoleDTO';
import {db} from '@copor/core/client/AppDataSource';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {DB} from '@copor/core/client/types/db';
import {UserPermissionCache} from '@copor/core/client/types/tables/UserPermissionCache';

type DbExecutor = Kysely<DB> | Transaction<DB>;

export class KyselyUserPermissionCacheHelper {
	private static inFlightByUser = new Map<string, Promise<void>>();

	public static async rebuildUser(
		userId: string,
		dbInstance: DbExecutor = db
	): Promise<void> {
		const inFlight = this.inFlightByUser.get(userId);

		if (inFlight) {
			await inFlight;

			return;
		}

		const rebuildPromise = this.doRebuildUser(userId, dbInstance);
		const cleanup = () => {
			if (this.inFlightByUser.get(userId) === rebuildPromise) {
				this.inFlightByUser.delete(userId);
			}
		};

		this.inFlightByUser.set(userId, rebuildPromise);
		rebuildPromise.then(cleanup, cleanup);

		await rebuildPromise;
	}

	private static async doRebuildUser(
		userId: string,
		dbInstance: DbExecutor
	): Promise<void> {
		try {
			const [
				userPermissions,
				rolePermissions,
				rawUserGroupPermissions
			] = await Promise.all([
				this.getUserPermissionListForUser(userId, dbInstance),
				this.getRolePermissionListForUser(userId, dbInstance),
				this.getEffectiveGroupPermissionListForUser(userId, dbInstance)
			]);

			const userPermissionMap = new Map(
				userPermissions.map((permission) => [permission.permissionType, permission])
			);

			const rolePermissionMap = new Map(
				rolePermissions.map((permission) => [permission.permissionType, permission])
			);

			// Each user group is resolved youngest-to-oldest along its own ancestor chain,
			// then the resolved values across all of the user's groups are combined (DENY wins).
			const userGroupPermissions = this.normalizeGroupPermissions(rawUserGroupPermissions);
			const userGroupPermissionMap = this.buildGroupPermissionMap(userGroupPermissions);

			const cacheRows = this.buildPermissionCacheRows(
				userId,
				userPermissionMap,
				userGroupPermissionMap,
				rolePermissionMap
			);

			await dbInstance
				.deleteFrom('userPermissionCache')
				.where('userId', '=', userId)
				.execute();

			await dbInstance
				.insertInto('userPermissionCache')
				.values(cacheRows)
				.execute();
		} catch (error) {
			console.error('KyselyUserPermissionCacheHelper.rebuildUser failed:', error);

			throw error;
		}
	}

	public static async deleteCacheForUsers(
		userList: string[],
		dbInstance: DbExecutor = db) {
		if (userList.length > 0)
			await dbInstance.deleteFrom('userPermissionCache')
				.where('userId', 'in', userList)
				.execute();
	}

	private static async getUserPermissionListForUser(
		userId: string,
		dbInstance: DbExecutor
	): Promise<ScopedPermission[]> {
		return dbInstance
			.selectFrom('userPermission')
			.select([
				'permissionType',
				'scope',
				'effect'
			])
			.where('userId', '=', userId)
			.where('effect', '!=', PermissionEffect.INHERIT)
			.execute();
	}

	private static async getRolePermissionListForUser(
		userId: string,
		dbInstance: DbExecutor
	): Promise<ScopedPermission[]> {
		return dbInstance
			.selectFrom('user as u')
			.innerJoin('rolePermission as rp', 'rp.roleId', 'u.roleId')
			.select([
				'rp.permissionType',
				'rp.scope',
				'rp.effect'
			])
			.where('u.id', '=', userId)
			.where('rp.effect', '!=', PermissionEffect.INHERIT)
			.execute();
	}

	private static async getEffectiveGroupPermissionListForUser(
		userId: string,
		dbInstance: DbExecutor
	): Promise<(ScopedPermission & {groupId: string, depth: number})[]> {
		const storedGroups = await dbInstance
			.selectFrom('userGroupUserMap')
			.select('userGroupId')
			.where('userId', '=', userId)
			.execute();

		const groupIds = [... new Set(storedGroups.map((row) => row.userGroupId))];

		if (groupIds.length === 0)
			return [];

		return dbInstance
			.selectFrom('userGroupClosure as ugc')
			.innerJoin(
				'userGroupPermission as ugp',
				'ugp.userGroupId',
				'ugc.ancestorId'
			)
			.select([
				'ugc.descendantId as groupId',
				'ugc.depth',
				'ugp.permissionType',
				'ugp.scope',
				'ugp.effect'
			])
			.where('ugc.descendantId', 'in', groupIds)
			.where('ugp.effect', '!=', PermissionEffect.INHERIT)
			.orderBy('ugc.depth', 'asc')
			.execute();
	}

	private static buildGroupPermissionMap(
		groupPermissions: (ScopedPermission & {
			groupId: string;
		})[]
	): Map<PermissionType, ScopedPermission> {
		const groupedByPermission
			= new Map<PermissionType, ScopedPermission[]>();

		for (const permission of groupPermissions) {
			const list
				= groupedByPermission.get(permission.permissionType) ?? [];

			list.push(permission);

			groupedByPermission.set(
				permission.permissionType,
				list
			);
		}

		const result
			= new Map<PermissionType, ScopedPermission>();

		for (const [permissionType, permissions] of groupedByPermission) {
			const resolved
				= KyselyPermissionHelper.resolvePermission(permissions);

			if (resolved)
				result.set(permissionType, resolved);
		}

		return result;
	}

	private static normalizeGroupPermissions(
		groupPermissions: (ScopedPermission & {
			groupId: string;
			depth: number;
		})[]
	): (ScopedPermission & {
			groupId: string;
		})[] {
		const best = new Map<
			string,
			ScopedPermission & {
				groupId: string;
				depth: number;
			}
		>();

		for (const p of groupPermissions) {
			const key = `${p.groupId}_${p.permissionType}`;

			const existing = best.get(key);

			if (!existing || p.depth < existing.depth) {
				best.set(key, p);
			}
		}

		return Array.from(best.values());
	}

	private static buildPermissionCacheRows(
		userId: string,
		userPermissionMap: Map<PermissionType, ScopedPermission>,
		userGroupPermissionMap: Map<PermissionType, ScopedPermission>,
		rolePermissionMap: Map<PermissionType, ScopedPermission>
	): UserPermissionCache[] {
		const rows: UserPermissionCache[] = [];

		const permissionTypes = getAllPermissionTypes();

		for (const permissionType of permissionTypes) {
			// Each map only ever holds a definite (ALLOW/DENY) entry, so the first
			// level that has one wins: user, then user groups, then role.
			const permission
				= userPermissionMap.get(permissionType)
				?? userGroupPermissionMap.get(permissionType)
				?? rolePermissionMap.get(permissionType)
				?? {
					permissionType,
					scope: PermissionScope.ALL,
					effect: PermissionEffect.DENY
				};

			rows.push({
				userId,
				permissionType,
				scope: permission.scope,
				effect: permission.effect
			});
		}

		return rows;
	}
}
