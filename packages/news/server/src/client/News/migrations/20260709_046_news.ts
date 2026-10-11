import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'news');

	table.addId();
	table.addVarChar255('title');
	table.addVarChar255('summary');
	table.addLongText('content');
	table.addPublishStatus();
	table.addCreatedBy();
	table.addCreatedAt();
	table.addModifiedBy();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('news').execute();
}
