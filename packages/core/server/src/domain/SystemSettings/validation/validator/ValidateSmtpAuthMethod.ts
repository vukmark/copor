import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {InvalidSystemSettingsException} from '@copor/core/domain/SystemSettings/exception/InvalidSystemSettingsException';
import {SmtpAuthMethod} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

export class ValidateSmtpAuthMethod implements Validator {
	constructor(private readonly smtpAuthMethod: string) {}

	public async validate(): Promise<void> {
		const allowedValues: string[] = Object.values(SmtpAuthMethod);

		if (!allowedValues.includes(this.smtpAuthMethod))
			throw new InvalidSystemSettingsException();
	}
}
