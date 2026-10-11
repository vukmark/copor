import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'to_do_tag_map');

	table.addVarChar('to_do_id', 36);
	table.addVarChar('tag_id', 36);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('to_do_tag_map').execute();
}