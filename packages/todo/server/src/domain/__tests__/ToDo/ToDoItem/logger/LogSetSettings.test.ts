import {LogDataForSetSettings, LogSetSettings} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogSetSettings';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Test logging of changing default settingst for todos', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSetSettings>> = {
		save: jest.fn()
	};
	const logData: LogDataForSetSettings = {
		alarmExists: false,
		displayedInCalendar: true
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForSetSettings> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'setSettings',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogSetSettings = new LogSetSettings(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});