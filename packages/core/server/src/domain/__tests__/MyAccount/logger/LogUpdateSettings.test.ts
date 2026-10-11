import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateSettings, LogUpdateSettings} from '@copor/core/domain/MyAccount/logger/LogUpdateSettings';

describe('Log update personal settings test', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateSettings>> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateSettings = {
		id: 'some-id',
		darkMode: false,
		expertMode: true,
		waiAria: true,
		avatar: 'some-url'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateSettings> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateSettings',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogUpdateSettings = new LogUpdateSettings(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});