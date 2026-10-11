import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'phone_number');

	table.addId();
	table.addVarChar('phone_number', 100);
	table.addEnum('phone_number_type', PhoneNumberType);

	table.addForeignKey('user_id', 'user');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('phone_number').execute();
}