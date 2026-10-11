import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidateCanGetSystemSettings} from '@copor/core/domain/SystemSettings/validation/validator/ValidateCanGetSystemSettings';
import {ValidationWithPermission} from '@copor/core/domain/Core/Validations/ValidationWithPermission';
import {
	ValidateGetSystemSettingsDTO
} from '@copor/core/domain/SystemSettings/validation/dto/ValidateGetSystemSettingsDTO';

export class ValidateGetSystemSettings
	extends ValidationWithPermission<ValidateGetSystemSettingsDTO> {
	public getValidators(): Validator[] {
		return [
			new ValidateCanGetSystemSettings(this.permissionRepo, this.input.actorId)
		];
	}
}
