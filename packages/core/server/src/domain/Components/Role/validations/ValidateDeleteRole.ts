import {ValidateCanDeleteRole} from './permissions/ValidateCanDeleteRole';
import {ValidateDeleteRoleRepo} from '../repository/ValidateDeleteRoleRepo';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateRole} from '@copor/core/domain/Core/Validations/Validators/ValidateRole';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteRoleInputDTO} from './dto/ValidateDeleteRoleInputDTO';
import {
	ValidateIsDefaultRoleForRoleType
} from '@copor/core/domain/Components/Role/validations/permissions/ValidateIsDefaultRoleForRoleType';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteRole extends ValidationWithPermissionAndRepo<ValidateDeleteRoleInputDTO, ValidateDeleteRoleRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteRole(this.permissionRepo, this.input.actorId),
			new ValidateRole(this.storageRepo, this.input.roleId),
			new ValidateIsDefaultRoleForRoleType(this.storageRepo, this.input.roleId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.roleId)
		];
	}
}
