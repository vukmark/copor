import {ValidateCanGetContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateCanGetContractType';
import {ValidateGetContractTypeRepo} from '../repository/ValidateGetContractTypeRepo';
import {ValidateGetContractTypeDTO} from './dto/ValidateGetContractTypeDTO';
import {ValidateContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateContractType';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetContractType extends ValidationWithPermissionAndRepo<ValidateGetContractTypeDTO, ValidateGetContractTypeRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetContractType(this.permissionRepo, this.input.actorId),
			new ValidateContractType(this.storageRepo, this.input.contractType)
		];
	}
}
