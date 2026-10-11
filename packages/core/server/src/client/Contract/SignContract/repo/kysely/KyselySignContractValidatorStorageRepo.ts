import {ValidateSignContractRepo} from '@copor/core/domain/Contract/repository/ValidateSignContractRepo';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {db} from '@copor/core/client/AppDataSource';

export class KyselySignContractValidatorStorageRepo implements ValidateSignContractRepo {
	async isInvalidContractType(contractType: ContractType | undefined): Promise<boolean> {
		if (!contractType) {
			return true;
		}

		const contract = await db
			.selectFrom('contract')
			.select('type')
			.where('type', '=', contractType)
			.executeTakeFirst();

		return !contract;
	}
}