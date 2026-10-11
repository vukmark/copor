import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeletePrivateToDoLoggerRepo} from '../fake/FakeDeletePrivateToDoLoggerRepo';
import {LogDataForDeletePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogDeletePrivateToDo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeletePrivateToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForDeletePrivateToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForDeletePrivateToDo>> {
		return {
			[DBEnv.FAKE]: FakeDeletePrivateToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}