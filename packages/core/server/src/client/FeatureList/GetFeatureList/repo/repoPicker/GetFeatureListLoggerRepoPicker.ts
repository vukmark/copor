import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetFeatureListLoggerRepo} from '../fake/FakeGetFeatureListLoggerRepo';
import {NoDataLoggerRepository} from '@copor/core/client/GlobalRepository/NoDataLoggerRepository';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetFeatureListLoggerRepoPicker extends NewRepositoryPicker<NoDataLoggerRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLoggerRepository> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetFeatureListLoggerRepo
		};
	}
}
