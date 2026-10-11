import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateAlarm, LogDataForCreateAlarm} from '@copor/todo/domain/ToDo/Alarm/logger/LogCreateAlarm';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';
import {AlarmableType, AlarmRepeatFrequency, AlarmStatus} from '@copor/todo/domain/ToDo/Alarm/interactor/dto/SaveAlarmDTO';

describe('log create todo alarm tests', () => {
	const mockRepo: LogRepository<LogDataForCreateAlarm> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateAlarm = {
		id: 'uniqueId',
		alarmableId: 'uniqueId',
		alarmableType: AlarmableType.PRIVATE_TODO,
		alarmTime: new Date(),
		repeatFrequency: AlarmRepeatFrequency.NONE,
		alarmStatus: AlarmStatus.DISMISSED
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForCreateAlarm> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createAlarm',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateAlarm = new LogCreateAlarm(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
