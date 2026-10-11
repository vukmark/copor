import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateTagLoggerRepo} from '../fake/FakeCreateTagLoggerRepo';
import {LogDataForCreateTag} from '@copor/core/domain/Components/Tag/logger/LogCreateTag';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateTagLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForCreateTag>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForCreateTag>> {
		return {
			[DBEnv.FAKE]: FakeCreateTagLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
