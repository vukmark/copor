import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createIndex('idx_user_is_active')
		.on('user')
		.column('is_active')
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropIndex('idx_user_is_active').on('user').execute();
}
