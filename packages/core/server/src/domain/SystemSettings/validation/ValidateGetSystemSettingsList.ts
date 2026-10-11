import {ValidateCanGetSystemSettingsList} from './validator/ValidateCanGetSystemSettingsList';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';

export class ValidateGetSystemSettingsList extends ValidationWithPermission<string> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetSystemSettingsList(this.permissionRepo, this.input)
		];
	}
}
