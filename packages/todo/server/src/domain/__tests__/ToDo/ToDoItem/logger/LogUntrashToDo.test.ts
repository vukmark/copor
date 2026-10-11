import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUntrashToDo, LogUntrashToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogUntrashToDo';
import {LogGeneralDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('test log untrash todo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForUntrashToDo>> = {
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

	const logData: LogDataForUntrashToDo = {untrashedToDoId: 'untrashed_todo_id'};

	const expectedLogForSave: LogForSave<LogDataForUntrashToDo> = {
		actionTime: actionTime,
		actorUserId: userId,
		actionType: 'untrashToDo',
		logData: logData
	};

	it('should log action', async () => {
		const logger = new LogUntrashToDo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});