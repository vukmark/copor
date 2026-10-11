import {Kysely} from 'kysely';
import {TableCreator} from '@copor/core/client/Core/Database/TableCreator';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

export async function up(db: Kysely<unknown>): Promise<void> {
	const table = new TableCreator<string>(db, 'tenant_contract');

	table.addId();
	table.addEnum('contract_type', ContractType);
	table.addDateTime('contract_signing_date');
	table.addText('contract_pdf_path');
	table.addVarChar('signed_by', 36);

	table.addForeignKey('tenant_id', 'tenant');

	table.addCreatedAt();
	table.addModifiedAt();
	table.addCreatedBy();
	table.addModifiedBy();

	await table.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable('tenant_contract').execute();
}
