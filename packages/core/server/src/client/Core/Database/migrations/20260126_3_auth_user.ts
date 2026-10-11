import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'auth_user');

	table.addId();
	table.addVarChar255('user_name');
	table.addVarChar255('password');
	table.addVarChar255('email', true);

	table.addCreatedBy();
	table.addModifiedBy();
	table.addCreatedAt();
	table.addModifiedAt();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('auth_user').execute();
}