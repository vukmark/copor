import {ValidateCanGetToDoCategoryList} from './permissions/ValidateCanGetToDoCategoryList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetToDoCategoryList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetToDoCategoryList(this.permissionRepo, this.input)
		];
	}
}
