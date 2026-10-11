import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'chat');

	table.addId();
	table.addVarCharWithDefaultStringValue('picture');
	table.addVarCharWithDefaultStringValue('name');
	table.addTinyIntWithDefault('is_private', 1);
	table.addVarCharWithDefaultStringValue('last_message');

	table.addDateTimeWithAutoUpdate('last_message_sent_time');

	table.addNullableForeignKey('last_message_sent_by', 'user');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('chat').execute();
}