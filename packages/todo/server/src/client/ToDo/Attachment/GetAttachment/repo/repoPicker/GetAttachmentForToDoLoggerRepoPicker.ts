import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetAttachmentForToDoLoggerRepo} from '../fake/FakeGetAttachmentForToDoLoggerRepo';
import {LogDataForGetAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogGetAttachmentForToDo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetAttachmentForToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetAttachmentForToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetAttachmentForToDo>> {
		return {
			[DBEnv.FAKE]: FakeGetAttachmentForToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
