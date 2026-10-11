import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateUserDTO} from '@copor/core/domain/User/validation/dto/ValidateCreateUserDTO';
import {ValidateCanCreateUser} from '@copor/core/domain/User/validation/validator/ValidateCanCreateUser';

export class ValidateCreateUser extends ValidationWithPermission<ValidateCreateUserDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanCreateUser(this.permissionRepo, this.input.actorId)
		];
	}
}