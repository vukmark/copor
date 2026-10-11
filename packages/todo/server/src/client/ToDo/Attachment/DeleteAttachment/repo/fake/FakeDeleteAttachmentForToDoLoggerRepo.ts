import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogDeleteAttachmentForToDo';

export class FakeDeleteAttachmentForToDoLoggerRepo implements LogRepository<LogDataForDeleteAttachmentForToDo> {
	save(logDTO: LogForSave<LogDataForDeleteAttachmentForToDo>): Promise<void> {
		return Promise.resolve();
	}
}
