import {ValidatorWithRepo} from '@copor/core/domain/Core/Validations/Validators/ValidatorWithRepo';
import {ContractType} from '@copor/core/domain/Core/enum/ContractType';
import {InvalidContractTypeException} from '../exception/InvalidContractTypeException';
import {IsInvalidContractTypeRepo} from '../../repository/IsInvalidContractTypeRepo';

export class ValidateContractType extends ValidatorWithRepo<IsInvalidContractTypeRepo, ContractType> {
	public async validate(): Promise<void> {
		if (await this.repository.isInvalidContractType(this.input))
			throw new InvalidContractTypeException();
	}
}