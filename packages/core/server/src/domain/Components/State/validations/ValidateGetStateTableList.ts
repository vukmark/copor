import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetStateList} from './permissions/ValidateCanGetStateList';

export class ValidateGetStateTableList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetStateList(this.permissionRepo, this.input)
		];
	}
}
