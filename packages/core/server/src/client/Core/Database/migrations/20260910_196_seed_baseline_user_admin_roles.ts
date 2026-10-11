import {Kysely} from 'kysely';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {defaultUserRoleId, defaultAdminRoleId} from '@copor/core/client/Core/Database/DefaultRoles';

// Baseline seed for the generic USER/ADMIN role model this template ships with.
// Existing role-specific permission-seed migrations from the source application
// were removed as part of the template extraction; new apps built on this
// template should add their own PermissionType seeds on top of these two roles.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db
		.insertInto('role' as never)
		.values([
			{
				id: defaultUserRoleId,
				name: 'User',
				type: RoleType.USER,
				is_default_for_role_type: true
			} as never,
			{
				id: defaultAdminRoleId,
				name: 'Admin',
				type: RoleType.ADMIN,
				is_default_for_role_type: true
			} as never
		])
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db
		.deleteFrom('role' as never)
		.where('id' as never, 'in', [defaultUserRoleId, defaultAdminRoleId] as never)
		.execute();
}
