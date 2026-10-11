import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetPrivateToDoLoggerRepo} from '../fake/FakeGetPrivateToDoLoggerRepo';
import {LogDataForGetPrivateToDo} from '@copor/todo/domain/ToDo/PrivateToDo/logger/LogGetPrivateToDo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetPrivateToDoLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetPrivateToDo>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetPrivateToDo>> {
		return {
			[DBEnv.FAKE]: FakeGetPrivateToDoLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
