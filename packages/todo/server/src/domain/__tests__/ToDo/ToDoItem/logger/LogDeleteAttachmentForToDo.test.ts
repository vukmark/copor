import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteAttachmentForToDo, LogDeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogDeleteAttachmentForToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Test logging of deletion of an attachment for a todo', () => {
	const repo: jest.Mocked<LogRepository<LogDataForDeleteAttachmentForToDo>> = {
		save: jest.fn()
	};
	const actionTime = new CurrentUTCDate();
	const actorId = 'user-id';
	const logData: LogDataForDeleteAttachmentForToDo = {deletedAttachmentId: 'deleted_attachment_id'};
	const expectedLogForSave: LogForSave<LogDataForDeleteAttachmentForToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'deleteAttachmentForToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should log deletion of an attachment for todo', async () => {
		const logger = new LogDeleteAttachmentForToDo(repo, logDetails, logData);

		await logger.log();

		expect(repo.save).toHaveBeenCalledWith(expectedLogForSave);
	});
});