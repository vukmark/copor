import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForUpdateSMTPSystemSettings, LogUpdateSMTPSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateSMTPSystemSettings';
import {SmtpAuthMethod, SmtpConnectionSecurity} from '@copor/core/domain/SystemSettings/interactor/dto/GetSMTPSystemSettingsDTO';

describe('log update System Settings tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateSMTPSystemSettings>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateSMTPSystemSettings = {
		smtpPort: 0,
		smtpHost: 'smtpHost',
		smtpPassword: 'smtpPassword',
		smtpEmail: 'smtpEmail',
		smtpConnectionSecurity: SmtpConnectionSecurity.starttls,
		smtpAuthMethod: SmtpAuthMethod.normalPassword
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForUpdateSMTPSystemSettings> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateSMTPSystemSettings',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateSMTPSystemSettings = new LogUpdateSMTPSystemSettings(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
