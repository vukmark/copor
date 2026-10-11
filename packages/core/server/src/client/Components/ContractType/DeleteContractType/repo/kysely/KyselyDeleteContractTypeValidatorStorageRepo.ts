import {ValidateDeleteContractTypeRepo}
	from '@copor/core/domain/Components/ContractType/repository/ValidateDeleteContractTypeRepo';
import {ContractTypeKyselyHelper} from '@copor/core/client/Components/ContractType/repositoryHelper/ContractTypeKyselyHelper';

export class KyselyDeleteContractTypeValidatorStorageRepo implements ValidateDeleteContractTypeRepo {
	isInvalidContractType(id: string | undefined): Promise<boolean> {
		return ContractTypeKyselyHelper.isInvalidContractType(id);
	}

	entityHasReferences(id: string): Promise<{tableName: string} | false> {
		return ContractTypeKyselyHelper.contractTypeHasReferences(id);
	}
}