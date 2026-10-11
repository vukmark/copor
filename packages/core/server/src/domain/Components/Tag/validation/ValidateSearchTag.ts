import {ValidateCanSearchTag} from './permissions/ValidateCanSearchTag';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateSearchTag extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanSearchTag(this.permissionRepo, this.input)];
	}
}
