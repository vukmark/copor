import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCreateUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateCreateUserGroupDTO';
import {ValidateCanCreateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanCreateUserGroup';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateCreateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateCreateUserGroupRepo';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';


export class ValidateCreateUserGroup extends ValidationWithPermissionAndRepo<ValidateCreateUserGroupDTO, ValidateCreateUserGroupRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [
			new ValidateCanCreateUserGroup(this.permissionRepo, this.input.actorId)
		];

		if (this.input.parentGroupId)
			validators.push(new ValidateUserGroup(this.storageRepo, this.input.parentGroupId));
		return validators;
	}
}
