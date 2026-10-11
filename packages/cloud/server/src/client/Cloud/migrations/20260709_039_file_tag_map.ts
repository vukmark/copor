import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'file_tag_map');

	table.addForeignKey('file_id', 'cloud_file');
	table.addForeignKey('tag_id', 'tag');
	table.addMultiplePrimaryKeys(['file_id', 'tag_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('file_tag_map').execute();
}
