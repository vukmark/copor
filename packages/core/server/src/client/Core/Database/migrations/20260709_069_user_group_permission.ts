import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_group_permission');

	table.addVarChar('permission_type', 100);
	table.addEnum('scope', PermissionScope);
	table.addEnum('effect', PermissionEffect);
	table.addForeignKey('user_group_id', 'user_group');
	table.addMultiplePrimaryKeys(['user_group_id', 'permission_type']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_group_permission').execute();
}
