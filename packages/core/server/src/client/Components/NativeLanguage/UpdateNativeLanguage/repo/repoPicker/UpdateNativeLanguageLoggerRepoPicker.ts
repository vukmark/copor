import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogUpdateNativeLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateNativeLanguageLoggerRepo} from '../fake/FakeUpdateNativeLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateNativeLanguageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateNativeLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateNativeLanguage>> {
		return {
			[DBEnv.FAKE]: FakeUpdateNativeLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
