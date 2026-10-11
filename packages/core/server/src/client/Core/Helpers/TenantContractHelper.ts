import {db} from '@copor/core/client/AppDataSource';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {TenantKyselyHelper} from '@copor/core/client/Components/Tenant/repositoryHelper/TenantKyselyHelper';

export interface MissingContractInfo {
	tenantId: string;
	tenantName: string;
	missingContracts: {type: ContractType; name: string}[];
}

export class TenantContractHelper {
	public static async checkTenantContractStatus(userId: string): Promise<MissingContractInfo | null> {
		const [tenantId] = await TenantKyselyHelper.getTenantListForUser(userId);

		if (!tenantId)
			return null;

		const tenant = await db.selectFrom('tenant').select(['id', 'name', 'isBaseTenant']).where('id', '=', tenantId).executeTakeFirst();

		if (!tenant || !tenant.isBaseTenant)
			return null;

		const signedContract = await db
			.selectFrom('tenantContract')
			.select('contractType')
			.where('tenantId', '=', tenantId)
			.where('contractType', '=', ContractType.CONTRACT_BETWEEN_TENANT_AND_PROVIDER)
			.executeTakeFirst();

		if (signedContract)
			return null;

		return {
			tenantId,
			tenantName: tenant.name,
			missingContracts: [{
				type: ContractType.CONTRACT_BETWEEN_TENANT_AND_PROVIDER,
				name: await this.getContractName(ContractType.CONTRACT_BETWEEN_TENANT_AND_PROVIDER)
			}]
		};
	}

	private static async getContractName(contractType: ContractType): Promise<string> {
		const contract = await db
			.selectFrom('contract as c')
			.select('c.name')
			.where('c.type', '=', contractType)
			.executeTakeFirst();

		return contract?.name ?? '';
	}
}
