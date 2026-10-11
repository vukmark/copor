import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogCreatePrivateToDo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {FakeCreatePrivateToDoLoggerRepo} from '../fake/FakeCreatePrivateToDoLoggerRepo';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreatePrivateToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreatePrivateToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreatePrivateToDo>> {
		return {
			[DBEnv.FAKE]: FakeCreatePrivateToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
