import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteLanguage} from '@copor/core/domain/Components/Language/logger/LogDeleteLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteLanguageLoggerRepo} from '../fake/FakeDeleteLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteLanguageLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteLanguage>> {
		return {
			[DBEnv.FAKE]: FakeDeleteLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}