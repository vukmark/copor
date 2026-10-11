import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUserGroup} from '@copor/core/domain/UserGroup/validation/validator/ValidateUserGroup';
import {ValidateCanGetUserGroupPermissionList} from './permissions/ValidateCanGetUserGroupPermissionList';
import {ValidateGetUserGroupPermissionListRepo} from '../repository/ValidateGetUserGroupPermissionListRepo';
import {ValidateGetUserGroupPermissionListDTO} from './dto/ValidateGetUserGroupPermissionListDTO';

export class ValidateGetUserGroupPermissionList
	extends ValidationWithPermissionAndRepo<ValidateGetUserGroupPermissionListDTO, ValidateGetUserGroupPermissionListRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserGroupPermissionList(this.permissionRepo, this.input.actorId),
			new ValidateUserGroup(this.storageRepo, this.input.userGroupId)
		];
	}
}
