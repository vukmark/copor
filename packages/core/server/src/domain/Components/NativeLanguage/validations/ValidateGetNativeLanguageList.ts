import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetNativeLanguageList} from './permissions/ValidateCanGetNativeLanguageList';

export class ValidateGetNativeLanguageList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetNativeLanguageList(this.permissionRepo, this.input)
		];
	}
}