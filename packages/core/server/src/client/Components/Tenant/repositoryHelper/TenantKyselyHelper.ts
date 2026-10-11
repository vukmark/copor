import {db} from '@copor/core/client/AppDataSource';
import {EntityRepoHelper} from '@copor/core/client/Core/repositoryHelper/EntityRepoHelper';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export class TenantKyselyHelper {
	public static async getTenantData(id: string) {
		const tenant = await db
			.selectFrom('tenant')
			.select([
				'tenant.id',
				'tenant.email',
				'tenant.name',
				'tenant.isBaseTenant'
			])
			.where('id', '=', id)
			.executeTakeFirst();

		return tenant;
	}
	public static async isInvalidTenant(id: string | undefined): Promise<boolean> {
		if (!id)
			return Promise.resolve(true);
		const tenant = await db.selectFrom('tenant')
			.select('id')
			.where('id', '=', id)
			.executeTakeFirst();

		return !tenant;
	}

	// A tenant is "activated" once it has at least one active admin user.
	public static async tenantAlreadyActivated(id: string | undefined): Promise<boolean> {
		if (!id) {
			return Promise.resolve(true);
		}
		const admins = await db
			.selectFrom('user as u')
			.innerJoin('role as r', 'r.id', 'u.roleId')
			.select('u.id')
			.where('u.tenantId', '=', id)
			.where('r.type', '=', RoleType.ADMIN)
			.where('u.isActive', '=', 1)
			.execute();

		return admins.length > 0;
	}

	public static async isNotBaseTenant(tenantId: string | undefined): Promise<boolean> {
		if (!tenantId)
			return true;

		const result = await db
			.selectFrom('tenant')
			.select('isBaseTenant')
			.where('id', '=', tenantId)
			.executeTakeFirst();

		return !result?.isBaseTenant;
	}
	public static async hasTenantReferences(id: string | undefined) {
		const helper = new EntityRepoHelper('tenant');

		return helper.hasReferences(id);
	}

	// In the generic template each user belongs to exactly one tenant (user.tenantId).
	public static async getTenantListForUser(userId: string | undefined): Promise<string[]> {
		if (!userId)
			return [];
		const user = await db
			.selectFrom('user')
			.select('tenantId')
			.where('id', '=', userId)
			.executeTakeFirst();

		return user?.tenantId ? [user.tenantId] : [];
	}
}
