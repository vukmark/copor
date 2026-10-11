import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'content_item');

	table.addId();
	table.addVarChar255('title');
	table.addVarChar255('summary');
	table.addLongText('content');
	table.addVarChar255('content_type');
	table.addPublishStatus();
	table.addCreatedBy();
	table.addCreatedAt();
	table.addModifiedBy();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('content_item').execute();
}