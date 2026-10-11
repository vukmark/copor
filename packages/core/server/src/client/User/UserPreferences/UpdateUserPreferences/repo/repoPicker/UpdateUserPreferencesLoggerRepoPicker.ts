import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForUpdateUserPreferences} from '@copor/core/domain/User/UserPreferences/logger/LogUpdateUserPreferences';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateUserPreferencesLoggerRepo} from '../fake/FakeUpdateUserPreferencesLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateUserPreferencesLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateUserPreferences>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateUserPreferences>> {
		return {
			[DBEnv.FAKE]: FakeUpdateUserPreferencesLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
