import {Kysely} from 'kysely';

// description needs up to 500 chars (real rows
// run past even that, up to 503 chars seen) -- cloud_file.description was
// varchar(255), too narrow for legitimate source data.
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('cloud_file')
		.modifyColumn('description', 'varchar(600)')
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.alterTable('cloud_file')
		.modifyColumn('description', 'varchar(255)')
		.execute();
}
