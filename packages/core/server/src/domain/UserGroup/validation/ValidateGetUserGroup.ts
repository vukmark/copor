import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateGetUserGroupDTO';
import {ValidateCanGetUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanGetUserGroup';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateGetUserGroupRepo';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';

export class ValidateGetUserGroup extends ValidationWithPermissionAndRepo<ValidateGetUserGroupDTO, ValidateGetUserGroupRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserGroup(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId)
		];
	}
}
