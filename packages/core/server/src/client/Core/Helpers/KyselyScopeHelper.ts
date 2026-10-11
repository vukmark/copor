import {DB} from '@copor/core/client/types/db';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {Kysely, SelectQueryBuilder} from 'kysely';

export class KyselyScopeHelper {
	private db: Kysely<DB>;
	constructor(db: Kysely<DB>) {
		this.db = db;
	}

	// `targetAlias` is the table alias of the entity being queried (e.g. 'user').
	// It must have an `id` column and, for TENANT scope, a `tenantId` column.
	public applyScope<T extends SelectQueryBuilder<DB, any, any>>(
		query: T,
		activeRole: RoleType,
		targetAlias: string,
		scope: PermissionScope,
		actorId: string,
		ids?: string[]
	): T {
		if (ids && ids.length === 0) {
			return query.where(({val}) => val(false)) as T;
		}

		switch (scope) {
			case PermissionScope.ALL :
				// ADMIN (or an explicit ALL grant) → unrestricted
				return query;

			case PermissionScope.OWN :
				return query.where(this.db.dynamic.ref(`${targetAlias}.id`), '=', actorId) as T;

			case PermissionScope.TENANT :
				return this.applyTenantScope(query, activeRole, targetAlias, actorId);

			default :
				return query;
		}
	}

	// 🔎 TENANT scope: everything belonging to the actor's own tenant/organization.
	private applyTenantScope<T extends SelectQueryBuilder<DB, any, any>>(
		query: T,
		activeRole: RoleType,
		targetAlias: string,
		actorId: string
	): T {
		if (activeRole === RoleType.ADMIN) {
			// ADMIN effectively has ALL; TENANT scope imposes no extra restriction.
			return query;
		}

		return query.where(this.db.dynamic.ref(`${targetAlias}.tenantId`), 'in',
			this.db.selectFrom('user')
				.select('tenantId')
				.where('id', '=', actorId)
				.where('tenantId', 'is not', null)
		) as T;
	}
}
