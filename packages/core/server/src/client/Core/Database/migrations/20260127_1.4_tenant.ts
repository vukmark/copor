import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'tenant');

	table.addId();
	table.addVarChar255('name');
	table.addVarChar255('address_street');
	table.addVarChar255('city');
	table.addForeignKey('region_id', 'region');

	table.addNullableForeignKey('contact_address_id', 'address');

	table.addTinyIntWithDefault('is_base_tenant');
	table.addPublishStatus();
	table.addVarChar255('email');
	table.addVarChar255('phone_number', true);
	table.addVarChar255('contact_name', true);
	table.addVarChar255('contact_department', true);
	table.addVarChar255('contact_phone', true);
	table.addVarChar255('contact_email', true);

	table.addCreatedBy();
	table.addModifiedBy();
	table.addCreatedAt();
	table.addModifiedAt();

	table.addDecimal('latitude', 12, 8, true);
	table.addDecimal('longitude', 12, 8, true);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('tenant').execute();
}
