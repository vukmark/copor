import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogDeleteToDoComment';

export class FakeDeleteToDoCommentLoggerRepo implements LogRepository<LogDataForDeleteToDoComment> {
	save(logDTO: LogForSave<LogDataForDeleteToDoComment>): Promise<void> {
		return Promise.resolve();
	}
}
