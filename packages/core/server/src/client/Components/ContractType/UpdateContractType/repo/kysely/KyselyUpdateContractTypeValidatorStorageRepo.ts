import {ValidateUpdateContractTypeRepo}
	from '@copor/core/domain/Components/ContractType/repository/ValidateUpdateContractTypeRepo';
import {ContractTypeKyselyHelper} from '@copor/core/client/Components/ContractType/repositoryHelper/ContractTypeKyselyHelper';

export class KyselyUpdateContractTypeValidatorStorageRepo implements ValidateUpdateContractTypeRepo {
	isInvalidContractType(contractTypeId: string | undefined): Promise<boolean> {
		return ContractTypeKyselyHelper.isInvalidContractType(contractTypeId);
	}
}
