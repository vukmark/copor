import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'region_city');

	table.addId();
	table.addForeignKey('region_id', 'region');
	table.addVarChar255('city');
	table.addVarChar255('community');
	table.addVarChar255('community_code', true);
	table.addVarChar255('province');
	table.addVarChar255('province_code', true);
	table.addDecimal('latitude', 10, 6);
	table.addDecimal('longitude', 10, 6);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('region_city').execute();
}
