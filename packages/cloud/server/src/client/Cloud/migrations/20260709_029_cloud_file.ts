import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'cloud_file');

	table.addId();
	table.addEnumString('sharing_type', ['PRIVATE', 'USER_GROUP', 'PUBLIC']);
	table.addInt('size', 11);
	table.addVarChar255('path');
	table.addVarChar255('name');
	table.addVarChar255('description', true);
	table.addVarChar255('created_by');
	table.addTimeStamp('created_at');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('cloud_file').execute();
}
