import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetContactList} from '@copor/contacts/domain/Contacts/validation/validator/ValidateCanGetContactList';

export class ValidateGetContactList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetContactList(this.permissionRepo, this.input)
		];
	}
}