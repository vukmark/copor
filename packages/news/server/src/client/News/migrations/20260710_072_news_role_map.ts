import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'news_role_map');

	table.addForeignKey('news_id', 'news');
	table.addForeignKey('role_id', 'role');
	table.addMultiplePrimaryKeys(['news_id', 'role_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('news_role_map').execute();
}
