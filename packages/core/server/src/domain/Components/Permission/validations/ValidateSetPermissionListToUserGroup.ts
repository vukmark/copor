import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {
	ValidateSetPermissionListToUserGroupDTO
} from '@copor/core/domain/Components/Permission/validations/dto/ValidateSetPermissionListToUserGroupDTO';
import {
	ValidateSetPermissionListToUserGroupRepo
} from '@copor/core/domain/Components/Permission/repository/ValidateSetPermissionListToUserGroupRepo';
import {
	ValidateCanSetPermissionListToUserGroup
} from '@copor/core/domain/Components/Permission/validations/permissions/ValidateCanSetPermissionListToUserGroup';

export class ValidateSetPermissionListToUserGroup
	extends ValidationWithPermissionAndRepo<ValidateSetPermissionListToUserGroupDTO, ValidateSetPermissionListToUserGroupRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSetPermissionListToUserGroup(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId)
		];
	}
}