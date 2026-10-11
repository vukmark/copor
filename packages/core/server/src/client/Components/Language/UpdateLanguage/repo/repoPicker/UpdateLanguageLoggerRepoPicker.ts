import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateLanguage} from '@copor/core/domain/Components/Language/logger/LogUpdateLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateLanguageLoggerRepo} from '../fake/FakeUpdateLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateLanguageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateLanguage>> {
		return {
			[DBEnv.FAKE]: FakeUpdateLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
