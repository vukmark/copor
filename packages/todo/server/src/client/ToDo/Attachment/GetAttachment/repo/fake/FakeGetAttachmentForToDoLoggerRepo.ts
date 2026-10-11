import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogGetAttachmentForToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetAttachmentForToDoLoggerRepo implements LogRepository<LogDataForGetAttachmentForToDo> {
	save(logDTO: LogForSave<LogDataForGetAttachmentForToDo>): Promise<void> {
		return Promise.resolve();
	}
}
