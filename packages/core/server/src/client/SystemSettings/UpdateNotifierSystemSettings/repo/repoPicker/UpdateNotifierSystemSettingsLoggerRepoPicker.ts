import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateNotifierSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdateNotifierSystemSettings/repo/fake/FakeUpdateNotifierSystemSettingsLoggerRepo';
import {LogDataForUpdateNotifierSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateNotifierSystemSettings';

export class UpdateNotifierSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateNotifierSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateNotifierSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateNotifierSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
