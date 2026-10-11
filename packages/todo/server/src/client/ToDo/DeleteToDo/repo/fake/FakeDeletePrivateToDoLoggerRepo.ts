import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogDeletePrivateToDo';

export class FakeDeletePrivateToDoLoggerRepo implements LogRepository<LogDataForDeletePrivateToDo> {
	save(logDTO: LogForSave<LogDataForDeletePrivateToDo>): Promise<void> {
		return Promise.resolve();
	}
}