import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'unexpected_error');

	table.addId();
	table.addLongText('message');
	table.addLongText('stack', true);
	table.addVarChar255('path', true);
	table.addVarChar255('method', true);
	table.addVarChar255('actor_id', true);
	table.addTimeStamp('created_at');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('unexpected_error').execute();
}
