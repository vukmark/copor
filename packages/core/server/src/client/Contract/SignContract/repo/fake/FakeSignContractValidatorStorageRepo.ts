import {ValidateSignContractRepo} from '@copor/core/domain/Contract/repository/ValidateSignContractRepo';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';


export class FakeSignContractValidatorStorageRepo implements ValidateSignContractRepo {
	isInvalidContractType(contractType: ContractType | undefined): Promise<boolean> {
		return Promise.resolve(false);
	}
}
