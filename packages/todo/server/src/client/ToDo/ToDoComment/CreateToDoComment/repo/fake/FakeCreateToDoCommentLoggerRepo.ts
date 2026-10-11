import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogCreateToDoComment';

export class FakeCreateToDoCommentLoggerRepo implements LogRepository<LogDataForCreateToDoComment> {
	save(logDTO: LogForSave<LogDataForCreateToDoComment>): Promise<void> {
		return Promise.resolve();
	}
}
