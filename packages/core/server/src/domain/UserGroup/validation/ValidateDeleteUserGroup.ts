import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateDeleteUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateDeleteUserGroupDTO';
import {ValidateCanDeleteUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanDeleteUserGroup';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateDeleteUserGroupRepo';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {ValidateDoesUserGroupHaveChildren} from './validator/ValidateDoesUserGroupHaveChildren';
import {ValidateIsGroupSpecial} from './validator/ValidateIsGroupSpecial';
import {ValidateEntityIsNotReferenced} from '@copor/core/domain/Core/Validations/Validators/ValidateEntityIsNotReferenced';

export class ValidateDeleteUserGroup extends ValidationWithPermissionAndRepo<ValidateDeleteUserGroupDTO, ValidateDeleteUserGroupRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteUserGroup(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId),
			new ValidateDoesUserGroupHaveChildren(this.storageRepo, this.input.userGroupId),
			new ValidateIsGroupSpecial(this.storageRepo, this.input.userGroupId),
			new ValidateEntityIsNotReferenced(this.storageRepo, this.input.userGroupId)
		];
	}
}
