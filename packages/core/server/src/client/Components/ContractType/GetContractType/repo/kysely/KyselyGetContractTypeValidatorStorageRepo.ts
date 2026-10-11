import {ValidateGetContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/ValidateGetContractTypeRepo';
import {ContractTypeKyselyHelper} from '@copor/core/client/Components/ContractType/repositoryHelper/ContractTypeKyselyHelper';

export class KyselyGetContractTypeValidatorStorageRepo implements ValidateGetContractTypeRepo {
	isInvalidContractType(contractTypeId: string | undefined): Promise<boolean> {
		return ContractTypeKyselyHelper.isInvalidContractType(contractTypeId);
	}
}
