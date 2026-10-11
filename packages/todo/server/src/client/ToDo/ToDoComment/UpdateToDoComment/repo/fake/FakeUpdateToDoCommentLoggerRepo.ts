import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogUpdateToDoComment';


export class FakeUpdateToDoCommentLoggerRepo implements LogRepository<LogDataForUpdateToDoComment> {
	save(logDTO: LogForSave<LogDataForUpdateToDoComment>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
