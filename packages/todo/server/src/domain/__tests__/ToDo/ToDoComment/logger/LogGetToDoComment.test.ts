import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForGetToDoComment, LogGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogGetToDoComment';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log get to-do comment', () => {
	const repo: jest.Mocked<LogRepository<LogDataForGetToDoComment>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForGetToDoComment = {id: 'comment_id'};
	const expectedLogForSave: LogForSave<LogDataForGetToDoComment> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'getToDoComment',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogGetToDoComment(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});