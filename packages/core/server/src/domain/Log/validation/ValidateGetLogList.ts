import {ValidateCanGetLogList} from './validator/ValidateCanGetLogList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetLogList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetLogList(this.permissionRepo, this.input)
		];
	}
}
