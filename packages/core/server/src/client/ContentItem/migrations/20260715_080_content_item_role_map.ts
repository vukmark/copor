import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'content_item_role_map');

	table.addForeignKey('content_item_id', 'content_item');
	table.addForeignKey('role_id', 'role');
	table.addMultiplePrimaryKeys(['content_item_id', 'role_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('content_item_role_map').execute();
}