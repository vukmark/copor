import {ValidateCanDeleteContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateCanDeleteContractType';
import {ValidateDeleteContractTypeDTO} from './dto/ValidateDeleteContractTypeDTO';
import {ValidateDeleteContractTypeRepo} from '../repository/ValidateDeleteContractTypeRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateContractType';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteContractType
	extends ValidationWithPermissionAndRepo<ValidateDeleteContractTypeDTO, ValidateDeleteContractTypeRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteContractType(this.permissionRepo, this.input.actorId),
			new ValidateContractType(this.storageRepo, this.input.contractTypeId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.contractTypeId)
		];
	}
}