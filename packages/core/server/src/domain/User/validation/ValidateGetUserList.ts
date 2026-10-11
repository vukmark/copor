import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetUserList} from '@copor/core/domain/User/validation/validator/ValidateCanGetUserList';

export class ValidateGetUserList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserList(this.permissionRepo, this.input)
		];
	}
}