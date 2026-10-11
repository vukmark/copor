import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {ValidateAddUserToUserGroupDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateAddUserToUserGroupDTO';
import {ValidateAddUserToUserGroupRepo} from '@copor/core/domain/UserGroup/repository/ValidateAddUserToUserGroupRepo';
import {ValidateCanAddUserToUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanAddUserToUserGroup';
import {ValidateIsGroupSpecial} from '@copor/core/domain/UserGroup/validation/validator/ValidateIsGroupSpecial';

export class ValidateAddUserToUserGroup
	extends ValidationWithPermissionAndRepo<ValidateAddUserToUserGroupDTO, ValidateAddUserToUserGroupRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanAddUserToUserGroup(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId),
			new ValidateIsGroupSpecial(this.storageRepo, this.input.userGroupId)
		];
	}
}