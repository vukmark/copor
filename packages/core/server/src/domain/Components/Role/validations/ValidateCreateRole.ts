import {ValidateCanCreateRole} from './permissions/ValidateCanCreateRole';
import {ValidateEmptyName} from '../../../Core/Validations/Validators/ValidateEmptyName';
import {Validator} from '../../../Core/Validations/Validators/Validator';
import {ValidationWithPermission} from '../../../Core/Validations/ValidationWithPermission';
import {ValidateCreateRoleDTO} from './dto/ValidateCreateRoleDTO';

export class ValidateCreateRole extends ValidationWithPermission<ValidateCreateRoleDTO> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanCreateRole(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name)
		];

		return validators;
	}
}
