import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'user_contract_map');

	table.addForeignKey('contract_id', 'contract');
	table.addForeignKey('user_id', 'user');
	table.addMultiplePrimaryKeys(['contract_id', 'user_id']);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('user_contract_map').execute();
}
