import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateLanguage} from '@copor/core/domain/Components/Language/logger/LogCreateLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateLanguageLoggerRepo} from '../fake/FakeCreateLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateLanguageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateLanguage>> {
		return {
			[DBEnv.FAKE]: FakeCreateLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
