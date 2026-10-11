import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetUserDTO} from '@copor/core/domain/User/validation/dto/ValidateGetUserDTO';
import {ValidateGetUserRepo} from '@copor/core/domain/User/repository/ValidateGetUserRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateCanGetUser} from '@copor/core/domain/User/validation/validator/ValidateCanGetUser';

export class ValidateGetUser extends ValidationWithPermissionAndRepo<ValidateGetUserDTO, ValidateGetUserRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateUser(this.storageRepo, this.input.userId),
			new ValidateCanGetUser(this.permissionRepo, this.input.actorId)
		];
	}
}