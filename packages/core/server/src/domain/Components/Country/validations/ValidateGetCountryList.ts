import {ValidateCanGetCountryList} from './permissions/ValidateCanGetCountryList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetCountryList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetCountryList(this.permissionRepo, this.input)
		];
	}
}
