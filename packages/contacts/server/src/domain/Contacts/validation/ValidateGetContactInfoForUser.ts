import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateGetContactInfoForUserRepo} from '@copor/contacts/domain/Contacts/repository/ValidateGetContactInfoForUserRepo';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetContactInfoForUserDTO} from '@copor/contacts/domain/Contacts/validation/dto/ValidateGetContactInfoForUserDTO';
import {ValidateCanGetContactInfoForUser, ValidateCanGetContactInfoForUserContext}
	from '@copor/contacts/domain/Contacts/validation/validator/ValidateCanGetContactInfoForUser';
import {ValidateUser} from '@copor/core/domain/User/validation/validator/ValidateUser';

export class ValidateGetContactInfoForUser extends
	ValidationWithPermissionAndRepo<
		ValidateGetContactInfoForUserDTO,
		ValidateGetContactInfoForUserRepo,
		ValidateCanGetContactInfoForUserContext
	> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetContactInfoForUser(this.permissionRepo, this.input.actorId, {userId: this.input.userId}),
			new ValidateUser(this.storageRepo, this.input.userId)
		];
	}
}