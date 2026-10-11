import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetPrivateToDo, LogGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogGetPrivateToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log get todo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetPrivateToDo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForGetPrivateToDo = {todoId: 'todo_id'};
	const expectedLogForSave: LogForSave<LogDataForGetPrivateToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getPrivateToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogGetPrivateToDo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});