import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_group_closure');

	table.addId();
	table.addForeignKey('ancestor_id', 'user_group');
	table.addForeignKey('descendant_id', 'user_group');
	table.addInt('depth', 11);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_group_closure').execute();
}
