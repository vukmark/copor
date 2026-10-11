import {Kysely} from 'kysely';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';

const contractIds = {
	tenantAgreement: 'f40bec07-755d-4a71-a950-cd99d0046f46',
	termsAndConditions: '4775ff9f-a645-484f-b394-6d4583c998f8'
};

export async function up(db: Kysely<unknown>): Promise<void> {
	await db
		.insertInto('contract' as never)
		.values([
			{id: contractIds.tenantAgreement, name: 'Tenant Agreement', type: ContractType.CONTRACT_BETWEEN_TENANT_AND_PROVIDER},
			{id: contractIds.termsAndConditions, name: 'Terms and Conditions', type: ContractType.TERMS_AND_CONDITIONS}
		] as never)
		.execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db
		.deleteFrom('contract' as never)
		.where('id' as never, 'in', Object.values(contractIds) as never)
		.execute();
}
