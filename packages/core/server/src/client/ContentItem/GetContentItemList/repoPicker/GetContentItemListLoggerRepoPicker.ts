import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeGetContentItemListLoggerRepo
} from '@copor/core/client/ContentItem/GetContentItemList/fake/FakeGetContentItemListLoggerRepo';

export class GetContentItemListLoggerRepoPicker
	extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetContentItemListLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}