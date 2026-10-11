import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForUpdateToDoCategory, LogUpdateToDoCategory} from '@copor/todo/domain/ToDo/ToDoCategory/logger/LogUpdateToDoCategory';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log update todo category tests', () => {
	const mockRepo: LogRepository<LogDataForUpdateToDoCategory> = {
		save: jest.fn()
	};
	const logData: LogDataForUpdateToDoCategory = {
		id: 'id',
		name: 'name',
		description: 'description'
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();
	const expectedLog: LogForSave<LogDataForUpdateToDoCategory> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateToDoCategory',
		logData: logData
	};
	const logDetails = new LogDetails(actorId);

	it('should successfully log the action', async () => {
		const logger = new LogUpdateToDoCategory(mockRepo, logDetails, logData);

		await logger.log();
		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
