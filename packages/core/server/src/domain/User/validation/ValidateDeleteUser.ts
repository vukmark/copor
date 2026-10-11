import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateDeleteUserDTO} from '@copor/core/domain/User/validation/dto/ValidateDeleteUserDTO';
import {ValidateDeleteUserRepo} from '@copor/core/domain/User/repository/ValidateDeleteUserRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanDeleteUser} from '@copor/core/domain/User/validation/validator/ValidateCanDeleteUser';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateDeleteUser extends ValidationWithPermissionAndRepo<ValidateDeleteUserDTO, ValidateDeleteUserRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanDeleteUser(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}