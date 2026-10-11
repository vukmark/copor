import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'cloud_category');

	table.addId();
	table.addVarChar255('name');
	table.addText('description', true);
	table.addPublishStatus();
	table.addEnumString('category_type', ['groups', 'facility', 'private']);

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('cloud_category').execute();
}