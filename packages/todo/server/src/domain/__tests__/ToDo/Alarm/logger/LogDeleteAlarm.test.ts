import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteAlarm, LogDeleteAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogDeleteAlarm';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log delete todo alarm', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteAlarm>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForDeleteAlarm = {id: 'deleted_alarm_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteAlarm> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteAlarm',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogDeleteAlarm(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
