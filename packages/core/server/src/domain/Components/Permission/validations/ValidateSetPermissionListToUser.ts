import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateSetPermissionListToUserDTO} from './dto/ValidateSetPermissionListToUserDTO';
import {ValidateSetPermissionListToUserRepo} from '../repository/ValidateSetPermissionListToUserRepo';
import {ValidateCanSetPermissionListToUser} from './permissions/ValidateCanSetPermissionListToUser';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateSetPermissionListToUser
	extends ValidationWithPermissionAndRepo<ValidateSetPermissionListToUserDTO, ValidateSetPermissionListToUserRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanSetPermissionListToUser(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}