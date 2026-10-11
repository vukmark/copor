import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeListVisibleUsersLoggerRepo} from '../fake/FakeListVisibleUsersLoggerRepo';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class ListVisibleUsersLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeListVisibleUsersLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
