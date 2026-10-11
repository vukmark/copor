import {ValidateGetContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/ValidateGetContractTypeRepo';

export class FakeGetContractTypeValidatorStorageRepo implements ValidateGetContractTypeRepo {
	isInvalidContractType(contractTypeId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
