import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogCreateAttachmentForToDo, LogDataForCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogCreateAttachmentForToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDetails} from '@copor/core/domain/Core/Logger/Logger';
import {CurrentUTCDate} from '@copor/core/domain/Core/global/SimpleDateAndTime/interactor/CurrentUTCDate';

describe('Test logging of creation of an attachment for a todo', () => {
	const mockRepo: jest.Mocked<LogRepository<LogDataForCreateAttachmentForToDo>> = {
		save: jest.fn()
	};

	const logData: LogDataForCreateAttachmentForToDo = {
		id: 'unique-attachment-id',
		name: 'some-todo-attachment.pdf',
		size: 2048,
		todoId: 'unique-todo-id'
	};

	const actorId = 'user-id';
	const actionTime = new CurrentUTCDate();

	const expectedLog: LogForSave<LogDataForCreateAttachmentForToDo> = {
		actionTime: actionTime,
		actorUserId: actorId,
		actionType: 'createAttachmentForToDo',
		logData: logData
	};

	const logDetails = new LogDetails(actorId);

	it('Should successfully log action', async () => {
		const logger: LogCreateAttachmentForToDo = new LogCreateAttachmentForToDo(mockRepo, logDetails, logData);

		await logger.log();

		expect(mockRepo.save).toHaveBeenCalledWith(expectedLog);
	});
});