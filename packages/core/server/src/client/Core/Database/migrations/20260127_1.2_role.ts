import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'role');

	table.addId();
	table.addVarChar255('name');

	table.addEnum('type', RoleType);

	table.addTinyIntWithDefault('is_default_for_role_type', 0);


	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('role').execute();
}