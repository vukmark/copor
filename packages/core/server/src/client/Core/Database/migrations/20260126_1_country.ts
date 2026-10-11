import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'country');

	table.addId();
	table.addName();
	table.addVarChar('code', 3);
	table.addPublishStatus();

	table.addCreatedBy();
	table.addCreatedAt();
	table.addModifiedBy();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('country').execute();
}