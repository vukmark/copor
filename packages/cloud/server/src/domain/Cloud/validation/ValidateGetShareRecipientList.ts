import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetShareRecipientList} from '@copor/cloud/domain/Cloud/validation/validator/ValidateCanGetShareRecipientList';

export class ValidateGetShareRecipientList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetShareRecipientList(this.permissionRepo, this.input)
		];
	}
}
