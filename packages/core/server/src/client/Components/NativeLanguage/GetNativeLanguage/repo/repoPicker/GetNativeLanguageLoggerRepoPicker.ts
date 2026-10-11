import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetNativeLanguage} from '@copor/core/domain/Components/NativeLanguage/logger/LogGetNativeLanguage';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetNativeLanguageLoggerRepo} from '../fake/FakeGetNativeLanguageLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetNativeLanguageLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForGetNativeLanguage>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForGetNativeLanguage>> {
		return {
			[DBEnv.FAKE]: FakeGetNativeLanguageLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
