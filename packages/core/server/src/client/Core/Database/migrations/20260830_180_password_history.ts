import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'password_history');

	table.addId();
	table.addForeignKey('auth_user_id', 'auth_user');
	table.addVarChar255('password_hash');
	table.addCreatedAt();
	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('password_history').execute();
}
