import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'message_notification');

	table.addVarChar('author', 50, true);
	table.addVarChar('preview_text', 100, true);

	table.addForeignKey('notification_id', 'notification');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('message_notification').execute();
}