import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateDisplaySystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdateDisplaySystemSettings/repo/fake/FakeUpdateDisplaySystemSettingsLoggerRepo';
import {LogDataForUpdateDisplaySystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateDisplaySystemSettings';

export class UpdateDisplaySystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateDisplaySystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateDisplaySystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateDisplaySystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}