import {ValidationWithPermission} from '../../Core/Validations/ValidationWithPermission';
import {Validator} from '../../Core/Validations/Validators/Validator';

import {
	ValidateCanGetPersonalAccountInformation
} from '../../Core/Validations/Validators/ValidateCanGetPersonalAccountInformation';

export class ValidateGetPersonalAccountInformation extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [new ValidateCanGetPersonalAccountInformation(this.permissionRepo, this.input)];
	}
}
