import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetPrivateTagListForUser, ValidateCanGetPrivateTagListForUserContext}
	from '@copor/core/domain/Core/Validations/Validators/ValidateCanGetPrivateTagListForUser';

export class ValidateGetPrivateTagListForUser extends ValidationWithPermission<string, ValidateCanGetPrivateTagListForUserContext> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetPrivateTagListForUser(this.permissionRepo, this.input, {userId: this.input})];
	}
}
