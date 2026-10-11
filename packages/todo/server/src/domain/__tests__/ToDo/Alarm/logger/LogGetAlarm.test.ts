import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {LogDataForGetAlarm, LogGetAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogGetAlarm';

describe('Log get alarm', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetAlarm>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'userId';
	const logData: LogDataForGetAlarm = {alarmId: 'alarmId'};
	const expectedLogForSave: LogForSave<LogDataForGetAlarm> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getAlarm',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('Should log get state', async () => {
		const logger = new LogGetAlarm(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
