import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';
import {LogDataForUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogUpdatePrivateToDo';

export class FakeUpdatePrivateToDoLoggerRepo implements LogRepository<LogDataForUpdatePrivateToDo> {
	save(logDTO: LogForSave<LogDataForUpdatePrivateToDo>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
