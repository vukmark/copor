import {Kysely, sql} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('email_outbox')
		.addColumn('priority', sql.raw('int(11)'), (col) => col.notNull().defaultTo(0))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('email_outbox')
		.dropColumn('priority')
		.execute();
}
