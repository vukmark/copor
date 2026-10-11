import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {ValidateIsGroupSpecial} from '@copor/core/domain/UserGroup/validation/validator/ValidateIsGroupSpecial';
import {ValidateCanSetUserGroupUserList} from '@copor/core/domain/UserGroup/validation/validator/ValidateCanSetUserGroupUserList';
import {ValidateSetUserGroupUserListRepo} from '@copor/core/domain/UserGroup/repository/ValidateSetUserGroupUserListRepo';
import {ValidateSetUserGroupUserListDTO} from '@copor/core/domain/UserGroup/validation/dto/ValidateSetUserGroupUserListDTO';

export class ValidateSetUserGroupUserList
	extends ValidationWithPermissionAndRepo<ValidateSetUserGroupUserListDTO, ValidateSetUserGroupUserListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSetUserGroupUserList(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId),
			new ValidateIsGroupSpecial(this.storageRepo, this.input.userGroupId)
		];
	}
}