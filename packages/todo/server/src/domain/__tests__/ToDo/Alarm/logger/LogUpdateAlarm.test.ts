import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateAlarm, LogUpdateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogUpdateAlarm';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

describe('log update todo category tests', () => {
	const mockRepo: LogRepository<LogDataForUpdateAlarm> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateAlarm = {
		id: 'uniqueId',
		alarmableId: 'uniqueId',
		alarmableType: AlarmableType.PRIVATE_TODO,
		alarmTime: new Date(),
		repeatFrequency: AlarmRepeatFrequency.NONE,
		alarmStatus: AlarmStatus.DISMISSED
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateAlarm> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateAlarm',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log the action', async () => {
		const logger = new LogUpdateAlarm(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
