import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForSetHoursForToDoAlert, LogSetHoursForToDoAlert} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogSetHoursForToDoAlert';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Log set hours for todo alert tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForSetHoursForToDoAlert>> = {
		save: jest.fn()
	};
	const logData: LogDataForSetHoursForToDoAlert = {
		userId: 'user-id',
		hours: 4
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForSetHoursForToDoAlert> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'setHoursForToDoAlert',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogSetHoursForToDoAlert = new LogSetHoursForToDoAlert(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
