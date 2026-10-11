import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetToDoCommentLoggerRepo} from '../fake/FakeGetToDoCommentLoggerRepo';
import {LogDataForGetToDoComment} from '@copor/todo/domain/ToDo/ToDoComment/logger/LogGetToDoComment';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetToDoCommentLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetToDoComment>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForGetToDoComment>> {
		return {
			[DBEnv.FAKE]: FakeGetToDoCommentLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
