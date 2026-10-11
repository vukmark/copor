import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'image');

	table.addId();
	table.addVarChar255('name', true);
	table.addVarChar255('extension', true);
	table.addInt('file_size', 11);
	table.addInt('width', 11);
	table.addInt('height', 11);
	table.addVarChar255('path');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('image').execute();
}