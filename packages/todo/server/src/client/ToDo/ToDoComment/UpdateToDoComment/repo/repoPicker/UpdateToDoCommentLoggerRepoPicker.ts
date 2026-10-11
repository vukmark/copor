import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateToDoCommentLoggerRepo} from '../fake/FakeUpdateToDoCommentLoggerRepo';
import {LogDataForUpdateToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogUpdateToDoComment';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateToDoCommentLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateToDoComment>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateToDoComment>> {
		return {
			[DBEnv.FAKE]: FakeUpdateToDoCommentLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
