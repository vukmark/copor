import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'region');

	table.addId();
	table.addVarChar('postal_code', 100);

	table.addForeignKey('state_id', 'state');
	table.addForeignKey('country_id', 'country');

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('region').execute();
}