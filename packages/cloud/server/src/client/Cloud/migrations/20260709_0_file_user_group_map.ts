import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'file_user_group_map');

	table.addForeignKey('file_id', 'cloud_file');
	table.addForeignKey('user_group_id', 'user_group');

	table.addMultiplePrimaryKeys(['user_group_id', 'file_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('file_user_group_map').execute();
}
