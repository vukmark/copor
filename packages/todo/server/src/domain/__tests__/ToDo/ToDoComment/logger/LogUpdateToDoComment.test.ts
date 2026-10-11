import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateToDoComment, LogUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogUpdateToDoComment';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('update todo comment log tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForUpdateToDoComment>> = {
		save: jest.fn()
	};

	const actionTime = new CurrentUTCDate();
	const actorId = 'actor-id';
	const logData: LogDataForUpdateToDoComment = {
		id: 'unique-id',
		toDoId: 'eID',
		content: 'content',
		actorId: 'cID'
	};

	const expectedLogForSave: LogForSave<LogDataForUpdateToDoComment> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'updateToDoComment',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully save log', async () => {
		const logger = new LogUpdateToDoComment(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});
