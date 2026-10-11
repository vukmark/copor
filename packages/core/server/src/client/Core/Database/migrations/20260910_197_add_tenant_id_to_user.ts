import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('user')
		.addColumn('tenant_id', 'varchar(36)', (col) => col.references('tenant.id').onDelete('set null'))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.alterTable('user').dropColumn('tenant_id').execute();
}
