import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_group_user_map');

	table.addForeignKey('user_group_id', 'user_group');
	table.addForeignKey('user_id', 'user');
	table.addMultiplePrimaryKeys(['user_group_id', 'user_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_group_user_map').execute();
}
