import {ValidateGetAllPermissionsForUserDTO} from '@copor/core/domain/Components/Permission/validations/dto/ValidateGetAllPermissionsForUserDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetAllPermissionsForUser
} from './permissions/ValidateCanGetAllPermissionsForUser';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateGetAllPermissionsForUser
	extends ValidationWithPermission<ValidateGetAllPermissionsForUserDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetAllPermissionsForUser(this.permissionRepo, this.input.actorId)
		];
	}
}
