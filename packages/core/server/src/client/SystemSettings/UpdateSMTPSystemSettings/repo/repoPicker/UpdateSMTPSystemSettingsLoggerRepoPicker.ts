import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForUpdateSMTPSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateSMTPSystemSettings';
import {FakeUpdateSMTPSystemSettingsLoggerRepo}
	from '@copor/core/client/SystemSettings/UpdateSMTPSystemSettings/repo/fake/FakeUpdateSMTPSystemSettingsLoggerRepo';

export class UpdateSMTPSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateSMTPSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateSMTPSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateSMTPSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
