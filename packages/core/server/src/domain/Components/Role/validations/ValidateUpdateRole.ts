import {SaveRoleDTO} from '../interactor/dto/SaveRoleDTO';
import {ValidateCanUpdateRole} from './permissions/ValidateCanUpdateRole';
import {ValidateUpdateRoleRepo} from '../repository/ValidateUpdateRoleRepo';
import {ValidationWithPermissionAndRepo} from '../../../Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '../../../Core/Validations/Validators/Validator';
import {ValidateEmptyName} from '../../../Core/Validations/Validators/ValidateEmptyName';
import {ValidateRole} from '../../../Core/Validations/Validators/ValidateRole';

export class ValidateUpdateRole extends ValidationWithPermissionAndRepo<SaveRoleDTO, ValidateUpdateRoleRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [new ValidateCanUpdateRole(this.permissionRepo, this.input.actorId),
			new ValidateEmptyName(this.input.name),
			new ValidateRole(this.storageRepo, this.input.id)];

		return validators;
	}
}
