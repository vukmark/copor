import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogCreatePrivateToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';


export class FakeCreatePrivateToDoLoggerRepo implements LogRepository<LogDataForCreatePrivateToDo> {
	save(logDTO: LogForSave<LogDataForCreatePrivateToDo>): Promise<void> {
		return Promise.resolve();
	}
}
