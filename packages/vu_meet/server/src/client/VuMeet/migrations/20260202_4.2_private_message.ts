import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'private_message');

	table.addId();
	table.addText('content');
	table.addEnumString('type', ['TEXT', 'PICTURE', 'CALL_EVENT']);
	table.addTinyInt('seen');
	table.addVarChar255('extension', true);

	table.addNullableForeignKey('chat_id', 'chat');
	table.addNullableForeignKey('sender_id', 'user');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('private_message').execute();
}