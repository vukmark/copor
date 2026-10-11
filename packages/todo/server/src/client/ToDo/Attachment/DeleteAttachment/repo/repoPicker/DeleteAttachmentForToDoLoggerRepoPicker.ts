import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteAttachmentForToDo} from '@copor/todo/domain/ToDo/ToDoItem/logger/LogDeleteAttachmentForToDo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeDeleteAttachmentForToDoLoggerRepo} from '../fake/FakeDeleteAttachmentForToDoLoggerRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteAttachmentForToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeleteAttachmentForToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeleteAttachmentForToDo>> {
		return {
			[DBEnv.FAKE]: FakeDeleteAttachmentForToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
