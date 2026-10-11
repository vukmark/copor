import {SaveContractTypeDTO} from '../interactor/dto/SaveContractTypeDTO';
import {ValidateCanUpdateContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateCanUpdateContractType';
import {ValidateUpdateContractTypeRepo} from '../repository/ValidateUpdateContractTypeRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyName';
import {ValidateContractType} from '@copor/core/domain/Components/ContractType/validations/validators/ValidateContractType';
import {ValidateEmptyFileName} from '@copor/core/domain/Core/Validations/Validators/ValidateEmptyFileName';

export class ValidateUpdateContractType
	extends ValidationWithPermissionAndRepo<SaveContractTypeDTO, ValidateUpdateContractTypeRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateContractType(this.permissionRepo, this.input.actorId),
			new ValidateContractType(this.storageRepo, this.input.id),
			new ValidateEmptyName(this.input.name),
			new ValidateEmptyFileName(this.input.file)
		];
	}
}
