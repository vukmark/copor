import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteToDoCommentLoggerRepo}
	from '@copor/todo/client/ToDo/ToDoComment/DeleteToDoComment/repo/fake/FakeDeleteToDoCommentLoggerRepo';
import {LogDataForDeleteToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogDeleteToDoComment';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteToDoCommentLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteToDoComment>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForDeleteToDoComment>> {
		return {
			[DBEnv.FAKE]: FakeDeleteToDoCommentLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
