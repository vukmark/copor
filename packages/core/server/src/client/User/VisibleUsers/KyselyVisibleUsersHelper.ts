import {DB} from '@copor/core/client/types/db';
import {db} from '@copor/core/client/AppDataSource';
import {SelectQueryBuilder} from 'kysely';
import {PermissionType} from '@copor/core/domain/Core/Permission/PermissionType';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {KyselyPermissionHelper} from '@copor/core/client/Core/Helpers/KyselyPermissionHelper';
import {KyselyScopeHelper} from '@copor/core/client/Core/Helpers/KyselyScopeHelper';

// Which users the actor may see under `permissionType`: its scope (OWN: nobody
// else, TENANT: same tenant, ALL: everyone), never the actor, nobody without an
// ALLOW grant, only active users when `activeOnly`. Shared by the picker list and
// the check on a picked user, so the two can't disagree.
export class KyselyVisibleUsersHelper {
	// `query` must select from `user` (alias `user`).
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- any selection, like KyselyScopeHelper.applyScope
	public static async restrictToVisible<T extends SelectQueryBuilder<DB, 'user', any>>(
		query: T,
		actorId: string,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<T> {
		const permission = await KyselyPermissionHelper.getPermission(actorId, permissionType);

		if (permission.effect !== PermissionEffect.ALLOW)
			return query.where(({val}) => val(false)) as T;

		let visible = query.where('user.id', '!=', actorId) as T;

		if (activeOnly)
			visible = visible.where('user.isActive', '=', 1) as T;

		return new KyselyScopeHelper(db).applyScope(
			visible,
			await this.getActorRoleType(actorId),
			'user',
			permission.scope,
			actorId
		);
	}

	public static async isUserNotVisible(
		actorId: string,
		userId: string | undefined,
		permissionType: PermissionType,
		activeOnly: boolean
	): Promise<boolean> {
		if (!userId)
			return true;

		const query = db.selectFrom('user').select('user.id').where('user.id', '=', userId);
		const user = await (await this.restrictToVisible(query, actorId, permissionType, activeOnly)).executeTakeFirst();

		return !user;
	}

	private static async getActorRoleType(actorId: string): Promise<RoleType> {
		const actor = await db.selectFrom('user')
			.innerJoin('role', 'role.id', 'user.roleId')
			.select('role.type as roleType')
			.where('user.id', '=', actorId)
			.executeTakeFirst();

		return actor?.roleType ?? RoleType.USER;
	}
}
