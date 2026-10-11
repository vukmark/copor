import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

// Email verification codes for self-registered accounts (see docs/modules/Registration.md).
export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'registration_verification');

	table.addId();
	table.addForeignKey('auth_user_id', 'auth_user');
	table.addVarChar255('code_hash');
	table.addTimeStamp('expires_at');
	table.addTinyIntWithDefault('used', 0);
	table.addTinyIntWithDefault('failed_attempts', 0);
	table.addCreatedAt();
	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('registration_verification').execute();
}
