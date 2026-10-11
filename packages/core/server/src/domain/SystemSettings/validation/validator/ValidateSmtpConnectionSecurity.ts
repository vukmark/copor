import {Validator} from '@copor/core/domain/Core/Validations/Validators/Validator';
import {InvalidSystemSettingsException} from '@copor/core/domain/SystemSettings/exception/InvalidSystemSettingsException';
import {SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

export class ValidateSmtpConnectionSecurity implements Validator {
	constructor(private readonly smtpConnectionSecurity: string) {}

	public async validate(): Promise<void> {
		const allowedValues: string[] = Object.values(SmtpConnectionSecurity);

		if (!allowedValues.includes(this.smtpConnectionSecurity))
			throw new InvalidSystemSettingsException();
	}
}
