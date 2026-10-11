import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogAssignUsersToToDo, LogDataForAssignUsersToToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogAssignUsersToToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log assign users to todo tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForAssignUsersToToDo>> = {
		save: jest.fn()
	};

	const logData: LogDataForAssignUsersToToDo = {
		todoId: 'tID',
		userIds: ['uID-1', 'uID-2', 'uID-3']
	};

	const actorId = 'actor-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForAssignUsersToToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'assignUsersToToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogAssignUsersToToDo = new LogAssignUsersToToDo(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
