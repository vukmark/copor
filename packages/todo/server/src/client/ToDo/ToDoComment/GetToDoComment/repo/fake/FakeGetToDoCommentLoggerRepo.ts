import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogGetToDoComment';

export class FakeGetToDoCommentLoggerRepo implements LogRepository<LogDataForGetToDoComment> {
	save(logDTO: LogForSave<LogDataForGetToDoComment>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
