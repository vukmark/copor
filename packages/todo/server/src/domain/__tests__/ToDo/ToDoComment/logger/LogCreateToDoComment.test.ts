import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogCreateToDoComment, LogDataForCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogCreateToDoComment';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log create todo comment tests', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateToDoComment>> = {
		save: jest.fn()
	};
	const logData: LogDataForCreateToDoComment = {
		id: 'unique-id',
		content: 'content',
		toDoId: 'entry-id',
		actorId: 'created-by',
		createdAt: new Date(1, 1, 2001, 22, 33)
	};
	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateToDoComment> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createToDoComment',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should successfully log action', async () => {
		const logger: LogCreateToDoComment = new LogCreateToDoComment(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});
