import {ValidateDeleteContractTypeRepo}
	from '@copor/core/domain/Components/ContractType/repository/ValidateDeleteContractTypeRepo';

export class FakeDeleteContractTypeValidatorStorageRepo implements ValidateDeleteContractTypeRepo {
	entityHasReferences(value: string): Promise<{tableName: string} | false> {
		return Promise.resolve(false);
	}
	isInvalidContractType(contractTypeId: string): Promise<boolean> {
		return Promise.resolve(false);
	}
}