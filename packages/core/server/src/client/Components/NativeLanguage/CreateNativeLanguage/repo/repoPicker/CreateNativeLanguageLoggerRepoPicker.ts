import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogCreateNativeLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateNativeLanguageLoggerRepo} from '../fake/FakeCreateNativeLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateNativeLanguageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateNativeLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateNativeLanguage>> {
		return {
			[DBEnv.FAKE]: FakeCreateNativeLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
