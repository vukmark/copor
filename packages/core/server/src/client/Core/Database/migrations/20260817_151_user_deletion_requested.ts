/* eslint-disable @typescript-eslint/naming-convention */
import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user')
		.addColumn('deletion_requested', 'boolean', (col) => col.notNull().defaultTo(false))
		.execute();

	await db
		.updateTable('user' as never)
		.set({deletion_requested: false} as never)
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user')
		.dropColumn('deletion_requested')
		.execute();
}
