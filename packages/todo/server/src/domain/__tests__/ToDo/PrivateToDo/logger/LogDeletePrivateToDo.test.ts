import {LogDataForDeletePrivateToDo, LogDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogDeletePrivateToDo';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';


describe('log delete todo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeletePrivateToDo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForDeletePrivateToDo = {toDoId: 'deleted_todo_id'};
	const expectedLogForSave: LogForSave<LogDataForDeletePrivateToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deletePrivateToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogDeletePrivateToDo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});