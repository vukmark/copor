import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateToDoCommentLoggerRepo}
	from '@copor/todo/client/ToDo/ToDoComment/CreateToDoComment/repo/fake/FakeCreateToDoCommentLoggerRepo';
import {LogDataForCreateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogCreateToDoComment';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateToDoCommentLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateToDoComment>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) =>
	LogRepository<LogDataForCreateToDoComment>> {
		return {
			[DBEnv.FAKE]: FakeCreateToDoCommentLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
