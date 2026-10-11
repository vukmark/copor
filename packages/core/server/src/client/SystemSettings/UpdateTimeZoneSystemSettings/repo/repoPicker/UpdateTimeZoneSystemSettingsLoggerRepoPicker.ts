import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateTimeZoneSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdateTimeZoneSystemSettings/repo/fake/FakeUpdateTimeZoneSystemSettingsLoggerRepo';
import {LogDataForUpdateTimeZoneSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateTimeZoneSystemSettings';

export class UpdateTimeZoneSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateTimeZoneSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateTimeZoneSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateTimeZoneSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
