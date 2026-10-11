import {GetSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/GetSystemSettingsRepo';
import {
	GetSMTPSystemSettingsDTO,
	SmtpAuthMethod,
	SmtpConnectionSecurity
} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';
import {GetSystemSettings} from '@copor/core/domain/SystemSettings/interactor/GetSystemSettings';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

describe('Get System Settings tests', () => {
	const mockRepo: jest.Mocked<GetSystemSettingsRepo<GetSMTPSystemSettingsDTO>> = {
		load: jest.fn()
	};

	const expectedResponse: GetSMTPSystemSettingsDTO = {
		smtpEmail: 'smtpEmail',
		smtpHost: 'smtpHost',
		smtpConnectionSecurity: SmtpConnectionSecurity.starttls,
		smtpAuthMethod: SmtpAuthMethod.normalPassword,
		smtpPassword: 'smtpPassword',
		smtpPort: 0
	};
	const getSystemSettings = new GetSystemSettings<GetSMTPSystemSettingsDTO>(SystemSettingsType.SMTP, mockRepo);

	it('Should return SystemSettings based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getSystemSettings.execute()).toEqual(expectedResponse);
	});
});