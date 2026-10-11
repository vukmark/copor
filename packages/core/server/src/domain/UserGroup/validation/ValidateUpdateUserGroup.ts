import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUpdateUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateUpdateUserGroupDTO';
import {ValidateCanUpdateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanUpdateUserGroup';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateUpdateUserGroupRepo';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';

export class ValidateUpdateUserGroup extends ValidationWithPermissionAndRepo<ValidateUpdateUserGroupDTO, ValidateUpdateUserGroupRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateUserGroup(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId)
		];
	}
}
