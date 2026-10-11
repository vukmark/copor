import {
    ValidateUpdateContractTypeRepo
} from '@copor/core/domain/Components/ContractType/repository/ValidateUpdateContractTypeRepo';

export class FakeUpdateContractTypeValidatorStorageRepo implements ValidateUpdateContractTypeRepo {
	isInvalidContractType(contractTypeId: string | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
