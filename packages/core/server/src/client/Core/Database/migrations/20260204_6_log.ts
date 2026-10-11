import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'log');

	table.addId();
	table.addVarChar('actor_id', 36, true);
	table.addLongText('log_data', true);
	table.addVarChar255('log_type');

	table.addCreatedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('log').execute();
}