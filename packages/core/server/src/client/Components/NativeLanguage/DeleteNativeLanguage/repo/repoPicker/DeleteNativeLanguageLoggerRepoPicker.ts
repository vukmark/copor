import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogDeleteNativeLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteNativeLanguageLoggerRepo} from '../fake/FakeDeleteNativeLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteNativeLanguageLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteNativeLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteNativeLanguage>> {
		return {
			[DBEnv.FAKE]: FakeDeleteNativeLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}