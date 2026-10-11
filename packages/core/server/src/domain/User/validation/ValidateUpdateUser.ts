import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateUserDTO} from '@copor/core/domain/User/validation/dto/ValidateUpdateUserDTO';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanUpdateUser} from '@copor/core/domain/User/validation/validator/ValidateCanUpdateUser';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';
import {ValidateUpdateUserRepo} from '@copor/core/domain/User/repository/ValidateUpdateUserRepo';

export class ValidateUpdateUser extends ValidationWithPermissionAndRepo<ValidateUpdateUserDTO, ValidateUpdateUserRepo> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateUser(this.permissionRepo, this.input.actorId),
			new ValidateUser(this.storageRepo, this.input.id)
		];
	}
}