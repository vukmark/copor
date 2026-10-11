import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetAllTagsForUser} from '@copor/core/domain/Components/Tag/validation/permissions/ValidateCanGetAllTagsForUser';

export class ValidateGetAllTagsForUser extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetAllTagsForUser(this.permissionRepo, this.input)];
	}
}
