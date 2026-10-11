import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogCreateAttachmentForToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateAttachmentForToDoLoggerRepo implements LogRepository<LogDataForCreateAttachmentForToDo> {
	save(logDTO: LogForSave<LogDataForCreateAttachmentForToDo>): Promise<void> {
		return Promise.resolve();
	}
}
