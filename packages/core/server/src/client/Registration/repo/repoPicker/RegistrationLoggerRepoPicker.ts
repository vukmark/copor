import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

class FakeRegistrationLogRepository<T> implements LogRepository<T> {
	public save(): Promise<void> {
		return Promise.resolve();
	}
}

// Shared by the register (typed) and verify (no-data) loggers.
export class RegistrationLoggerRepoPicker extends NewRepositoryPicker<LogRepository<unknown>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<unknown>> {
		return {
			[DBEnv.FAKE]: FakeRegistrationLogRepository,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
