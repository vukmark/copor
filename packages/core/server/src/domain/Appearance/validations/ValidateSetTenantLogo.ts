import {ValidateCanUpdateTenantLogo} from './permissions/ValidateCanUpdateTenantLogo';
import {Validator} from '../../Core/Validations/Validators/Validator';
import {ValidationWithPermission} from '../../Core/Validations/ValidationWithPermission';

export class ValidateSetTenantLogo extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanUpdateTenantLogo(this.permissionRepo, this.input)
		];
	}
}
