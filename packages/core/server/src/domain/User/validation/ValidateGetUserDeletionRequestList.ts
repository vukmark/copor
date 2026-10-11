import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {
	ValidateCanGetUserDeletionRequestList
} from '@copor/core/domain/User/validation/validator/ValidateCanGetUserDeletionRequestList';

export class ValidateGetUserDeletionRequestList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetUserDeletionRequestList(this.permissionRepo, this.input)
		];
	}
}
