import {ValidateCanCreateContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateCanCreateContractType';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateCreateContractTypeDTO} from './dto/ValidateCreateContractTypeDTO';
import {ValidateEmptyFileName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyFileName';

export class ValidateCreateContractType extends ValidationWithPermission<ValidateCreateContractTypeDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateContractType(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyFileName(this.input.file)
		];
	}
}
