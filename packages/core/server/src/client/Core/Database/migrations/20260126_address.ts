import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'address');

	table.addId();
	table.addVarChar255('street_address', true);
	table.addVarChar255('city', true);
	table.addVarChar255('postal_code', true);
	table.addNullableForeignKey('country', 'country');
	table.addNullableForeignKey('state', 'state');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('address').execute();
}