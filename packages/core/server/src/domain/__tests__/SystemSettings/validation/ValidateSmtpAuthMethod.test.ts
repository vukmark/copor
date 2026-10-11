import {ValidateSmtpAuthMethod} from '@copor/core/domain/SystemSettings/validation/validator/ValidateSmtpAuthMethod';
import {InvalidSystemSettingsException} from '@copor/core/domain/SystemSettings/exception/InvalidSystemSettingsException';
import {SmtpAuthMethod} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

describe('ValidateSmtpAuthMethod', () => {
	it.each(Object.values(SmtpAuthMethod))('should pass for allowed value %s', async (value) => {
		const validator = new ValidateSmtpAuthMethod(value);

		await expect(validator.validate()).resolves.toBeUndefined();
	});

	it('should throw InvalidSystemSettingsException for an unknown value', async () => {
		const validator = new ValidateSmtpAuthMethod('not-a-real-option');

		await expect(validator.validate()).rejects.toThrow(InvalidSystemSettingsException);
	});
});
