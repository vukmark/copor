import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateGlobalSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdateGlobalSystemSettings/repo/fake/FakeUpdateGlobalSystemSettingsLoggerRepo';
import {LogDataForUpdateGlobalSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateGlobalSystemSettings';

export class UpdateGlobalSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateGlobalSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateGlobalSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateGlobalSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
