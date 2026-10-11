import {Kysely, sql} from 'kysely';

// permission_code / depends_on_code store the permission key (`<module>.<name>`,
// see domain/src/Core/Permission/PermissionType.ts), matching how user_permission
// stores it (permission_type VARCHAR).
export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable('permission_dependencies')
		.addColumn('permission_code', sql.raw('varchar(100)'), (col) => col.notNull())
		.addColumn('depends_on_code', sql.raw('varchar(100)'), (col) => col.notNull())
		.addPrimaryKeyConstraint('permission_dependencies_pk', ['permission_code', 'depends_on_code'])
		.execute();

	await db.schema
		.createIndex('permission_dependencies_permission_code_idx')
		.on('permission_dependencies')
		.column('permission_code')
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('permission_dependencies').execute();
}
