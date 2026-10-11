import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetCloudCategoryList} from './permissions/ValidateCanGetCloudCategoryList';

export class ValidateGetCloudCategoryList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetCloudCategoryList(this.permissionRepo, this.input)
		];
	}
}