import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {PermissionScope} from '@copor/core/domain/Core/enum/PermissionScope';
import {PermissionEffect} from '@copor/core/domain/Core/Permission/PermissionEffect';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_permission');

	table.addVarChar('permission_type', 100);
	table.addEnum('scope', PermissionScope);
	table.addEnum('effect', PermissionEffect);

	table.addForeignKey('user_id', 'user');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_permission').execute();
}