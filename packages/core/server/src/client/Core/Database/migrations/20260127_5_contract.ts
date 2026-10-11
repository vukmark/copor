import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'contract');

	table.addId();
	table.addText('name');
	table.addEnum('type', ContractType);

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('contract').execute();
}
