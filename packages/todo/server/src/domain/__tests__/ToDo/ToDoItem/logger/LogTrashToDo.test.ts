import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForTrashToDo, LogTrashToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogTrashToDo';
import {LogGeneralDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('test log trash todo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForTrashToDo>> = {
		save: jest.fn()
	};

	const logDetails: jest.Mocked<LogGeneralDetails> = {
		getActionTime: jest.fn(),
		getActorId: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const userId = 'user_id';

	logDetails.getActorId.mockReturnValue(userId);
	logDetails.getActionTime.mockReturnValue(actionTime);

	const logData: LogDataForTrashToDo = {trashedToDoId: 'trashed_todo_id'};

	const expectedLogForSave: LogForSave<LogDataForTrashToDo> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'trashToDo',
		logData: logData
	};

	it('should log action', async () => {
		const logger = new LogTrashToDo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});