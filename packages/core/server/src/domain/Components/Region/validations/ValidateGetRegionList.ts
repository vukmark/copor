import {ValidateCanGetRegionList} from './permissions/ValidateCanGetRegionList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetRegionList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetRegionList(this.permissionRepo, this.input)
		];
	}
}