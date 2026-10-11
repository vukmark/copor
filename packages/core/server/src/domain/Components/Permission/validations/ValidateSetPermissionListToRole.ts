import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateSetPermissionListToRoleRepo} from '../repository/ValidateSetPermissionListToRoleRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanSetPermissionListToRole} from './permissions/ValidateCanSetPermissionListToRole';
import {ValidateRole} from '@copor/core/domain/Core/Validations/Validators/ValidateRole';

import {ValidateSetPermissionListToRoleDTO} from './dto/ValidateSetPermissionListToRoleDTO';

export class ValidateSetPermissionListToRole
	extends ValidationWithPermissionAndRepo<ValidateSetPermissionListToRoleDTO, ValidateSetPermissionListToRoleRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSetPermissionListToRole(this.permissionRepo, this.input.actorId),
			new ValidateRole(this.storageRepo, this.input.roleId)
		];
	}
}