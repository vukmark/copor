import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTagLoggerRepo} from '../fake/FakeGetTagLoggerRepo';
import {LogDataForGetTag} from '@copor/core/domain/Components/Tag/logger/LogGetTag';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetTagLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetTag>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetTag>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetTagLoggerRepo
		};
	}
}
