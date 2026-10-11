import {ValidateSmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/validation/validator/ValidateSmtpConnectionSecurity';
import {InvalidSystemSettingsException} from '@copor/core/domain/SystemSettings/exception/InvalidSystemSettingsException';
import {SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

describe('ValidateSmtpConnectionSecurity', () => {
	it.each(Object.values(SmtpConnectionSecurity))('should pass for allowed value %s', async (value) => {
		const validator = new ValidateSmtpConnectionSecurity(value);

		await expect(validator.validate()).resolves.toBeUndefined();
	});

	it('should throw InvalidSystemSettingsException for an unknown value', async () => {
		const validator = new ValidateSmtpConnectionSecurity('not-a-real-option');

		await expect(validator.validate()).rejects.toThrow(InvalidSystemSettingsException);
	});
});
