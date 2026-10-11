import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user')
		.addColumn('last_visited_at', 'timestamp', (col) => col.defaultTo(null))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user')
		.dropColumn('last_visited_at')
		.execute();
}
