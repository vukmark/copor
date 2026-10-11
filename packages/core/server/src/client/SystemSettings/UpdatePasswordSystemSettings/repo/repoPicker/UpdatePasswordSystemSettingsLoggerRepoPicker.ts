import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdatePasswordSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdatePasswordSystemSettings/repo/fake/FakeUpdatePasswordSystemSettingsLoggerRepo';
import {LogDataForUpdatePasswordSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdatePasswordSystemSettings';

export class UpdatePasswordSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdatePasswordSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdatePasswordSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdatePasswordSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
