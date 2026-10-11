import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogCreateAttachmentForToDo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeCreateAttachmentForToDoLoggerRepo} from '../fake/FakeCreateAttachmentForToDoLoggerRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateAttachmentForToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateAttachmentForToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateAttachmentForToDo>> {
		return {
			[DBEnv.FAKE]: FakeCreateAttachmentForToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
