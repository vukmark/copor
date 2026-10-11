import {InvalidContractTypeException} from '@copor/core/domain/Contract/validation/exception/InvalidContractTypeException';
import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {IsInvalidContractTypeRepo} from '@copor/core/domain/Components/ContractType/repository/IsInvalidContractTypeRepo';

export class ValidateContractType extends ValidatorWithRepo<IsInvalidContractTypeRepo, string | undefined> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidContractType(this.input))
			throw new InvalidContractTypeException();
	}
}