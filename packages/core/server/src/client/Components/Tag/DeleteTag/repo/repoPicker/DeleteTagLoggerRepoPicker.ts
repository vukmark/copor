import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTagLoggerRepo} from '../fake/FakeDeleteTagLoggerRepo';
import {LogDataForDeleteTag} from '@copor/core/domain/Components/Tag/logger/LogDeleteTag';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteTagLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteTag>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteTag>> {
		return {
			[DBEnv.FAKE]: FakeDeleteTagLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}