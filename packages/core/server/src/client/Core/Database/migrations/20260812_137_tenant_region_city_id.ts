import {Kysely} from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('tenant')
		.addColumn('region_city_id', 'varchar(36)', (col) => col.references('region_city.id').onDelete('cascade'))
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.alterTable('tenant').dropColumn('region_city_id').execute();
}
