import {ContractsSignedCheckRepo} from '@copor/core/domain/Login/repository/ContractsSignedCheckRepo';
import {ContractsSignedCheckResultDTO} from '@copor/core/domain/Login/interactor/dto/ContractsSignedCheckResultDTO';
import {TenantContractHelper} from '@copor/core/client/Core/Helpers/TenantContractHelper';

export class KyselyContractsSignedCheckRepo implements ContractsSignedCheckRepo {
	async checkContracts(userId: string): Promise<ContractsSignedCheckResultDTO | null> {
		const missingContractsInfo = await TenantContractHelper.checkTenantContractStatus(userId);

		if (!missingContractsInfo) {
			return null;
		}

		return {
			tenantId: missingContractsInfo.tenantId,
			tenantName: missingContractsInfo.tenantName,
			missingContracts: missingContractsInfo.missingContracts
		};
	}
}
