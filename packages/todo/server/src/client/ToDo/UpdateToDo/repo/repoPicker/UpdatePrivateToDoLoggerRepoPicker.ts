import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdatePrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogUpdatePrivateToDo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdatePrivateToDoLoggerRepo} from '../fake/FakeUpdatePrivateToDoLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdatePrivateToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdatePrivateToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdatePrivateToDo>> {
		return {
			[DBEnv.FAKE]: FakeUpdatePrivateToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
