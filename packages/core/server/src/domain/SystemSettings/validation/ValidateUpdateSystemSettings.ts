import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {ValidationWithPermissionAndRepo} from '@copor/core/domain/Core/Validations/ValidationWithPermissionAndRepo';
import {ValidateUpdateSystemSettingsDTO} from '@copor/core/domain/SystemSettings/validation/dto/ValidateUpdateSystemSettingsDTO';
import {ValidateUpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/ValidateUpdateSystemSettingsRepo';
import {ValidateCanUpdateSystemSettings} from '@copor/core/domain/SystemSettings/validation/validator/ValidateCanUpdateSystemSettings';
import {ValidateSystemSetting} from '@copor/core/domain/Core/Validations/Validators/ValidateSystemSetting';
import {ValidateSmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/validation/validator/ValidateSmtpConnectionSecurity';
import {ValidateSmtpAuthMethod} from '@copor/core/domain/SystemSettings/validation/validator/ValidateSmtpAuthMethod';

export class ValidateUpdateSystemSettings
	extends ValidationWithPermissionAndRepo<ValidateUpdateSystemSettingsDTO, ValidateUpdateSystemSettingsRepo> {
	public getValidators(): Validator[] {
		const validators: Validator[] = [new ValidateCanUpdateSystemSettings(this.permissionRepo, this.input.actorId)];

		if (this.input.timeZone !== undefined)
			validators.push(new ValidateSystemSetting(this.storageRepo, this.input.timeZone));

		if (this.input.smtpConnectionSecurity !== undefined)
			validators.push(new ValidateSmtpConnectionSecurity(this.input.smtpConnectionSecurity));

		if (this.input.smtpAuthMethod !== undefined)
			validators.push(new ValidateSmtpAuthMethod(this.input.smtpAuthMethod));

		return validators;
	}
}