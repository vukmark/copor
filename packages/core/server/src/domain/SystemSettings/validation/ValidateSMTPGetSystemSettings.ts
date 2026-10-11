import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateGetSMTPSystemSettingsDTO} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSMTPSystemSettingsDTO';
import {ValidateCanGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/validator/ValidateCanGetSystemSettings';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';

export class ValidateSMTPGetSystemSettings
	extends ValidationWithPermission<ValidateGetSMTPSystemSettingsDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetSystemSettings(this.permissionRepo, this.input.actorId)
		];
	}
}
