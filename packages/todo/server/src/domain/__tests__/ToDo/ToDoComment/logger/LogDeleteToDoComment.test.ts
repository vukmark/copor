import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {LogDataForDeleteToDoComment, LogDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogDeleteToDoComment';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('log delete entry', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteToDoComment>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user_id';
	const logData: LogDataForDeleteToDoComment = {deletedCommentId: 'deleted_comment_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteToDoComment> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteToDoComment',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('should log action', async () => {
		const logger = new LogDeleteToDoComment(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});