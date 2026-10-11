import {NewRepositoryPicker} from '../../../../../Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '../../../../../Interface/AppContext';
import {DBEnv} from '../../../../../enum/DBEnv';
import {FakeGetNotificationTokenListLoggerRepo} from '../fake/FakeGetNotificationTokenListLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetNotificationTokenListLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetNotificationTokenListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
