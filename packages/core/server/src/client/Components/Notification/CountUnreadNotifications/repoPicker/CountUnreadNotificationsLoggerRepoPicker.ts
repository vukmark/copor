import {FakeCountUnreadNotificationsLoggerRepo} from '../fake/FakeCountUnreadNotificationsLoggerRepo';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CountUnreadNotificationsLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeCountUnreadNotificationsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
