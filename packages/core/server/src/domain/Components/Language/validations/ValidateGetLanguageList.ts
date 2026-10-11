import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetLanguageList} from './permissions/ValidateCanGetLanguageList';

export class ValidateGetLanguageList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetLanguageList(this.permissionRepo, this.input)
		];
	}
}