import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'password_reset_token');

	table.addId();
	table.addForeignKey('auth_user_id', 'auth_user');
	table.addVarChar255('code_hash');
	table.addTimeStamp('expires_at');
	table.addTinyIntWithDefault('used', 0);
	table.addCreatedAt();
	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('password_reset_token').execute();
}

/*
CREATE TABLE password_reset_token (
    id VARCHAR(36) NOT NULL,
    auth_user_id VARCHAR(36) NOT NULL,
    code_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    CONSTRAINT fk_password_reset_token_user
FOREIGN KEY (auth_user_id)
REFERENCES auth_user(id)
);
*/
