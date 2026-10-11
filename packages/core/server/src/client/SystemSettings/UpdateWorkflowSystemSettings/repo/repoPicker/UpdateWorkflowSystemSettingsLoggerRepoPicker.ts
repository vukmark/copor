import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {
	FakeUpdateWorkflowSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/UpdateWorkflowSystemSettings/repo/fake/FakeUpdateWorkflowSystemSettingsLoggerRepo';
import {LogDataForUpdateWorkflowSystemSettings} from '@copor/core/domain/SystemSettings/logger/LogUpdateWorkflowSystemSettings';

export class UpdateWorkflowSystemSettingsLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForUpdateWorkflowSystemSettings>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForUpdateWorkflowSystemSettings>> {
		return {
			[DBEnv.FAKE]: FakeUpdateWorkflowSystemSettingsLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
