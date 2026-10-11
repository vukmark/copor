import {ValidateCanGetRole} from './permissions/ValidateCanGetRole';
import {ValidateGetRoleInputDTO} from './dto/ValidateGetRoleInputDTO';
import {Validator} from '../../../Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '../../../Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetRoleRepo} from '../repository/ValidateGetRoleRepo';
import {ValidateRole} from '../../../Core/Validations/Validators/ValidateRole';

export class ValidateGetRole extends ValidationWithPermissionAndRepo<ValidateGetRoleInputDTO, ValidateGetRoleRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRole(this.permissionRepo, this.input.actorId),
			new ValidateRole(this.storageRepo, this.input.roleId)
		];
	}
}