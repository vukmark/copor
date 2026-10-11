import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {
	FakeGetAllTagsForUserLoggerRepo
} from '@copor/core/client/Components/Tag/GetAllTagsForUser/repo/fake/FakeGetAllTagsForUserLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetAllTagsForUserLoggerRepoPicker
	extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> NoDataLogRepository> {
		return {
			[DBEnv.FAKE]: FakeGetAllTagsForUserLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
