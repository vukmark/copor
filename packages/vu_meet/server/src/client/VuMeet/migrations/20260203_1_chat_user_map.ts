import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'chat_user_map');

	table.addForeignKey('chat_id', 'chat');
	table.addForeignKey('user_id', 'user');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('chat_user_map').execute();
}