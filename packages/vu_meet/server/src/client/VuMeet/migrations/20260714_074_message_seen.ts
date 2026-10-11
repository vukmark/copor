import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'message_seen');

	table.addForeignKey('message_id', 'private_message');
	table.addForeignKey('user_id', 'user');
	table.addTimeStamp('seen_at');
	table.addMultiplePrimaryKeys(['message_id', 'user_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('message_seen').execute();
}
