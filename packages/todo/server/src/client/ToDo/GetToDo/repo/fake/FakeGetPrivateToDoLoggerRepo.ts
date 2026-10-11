import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogGetPrivateToDo';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';


export class FakeGetPrivateToDoLoggerRepo implements LogRepository<LogDataForGetPrivateToDo> {
	save(logDTO: LogForSave<LogDataForGetPrivateToDo>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
