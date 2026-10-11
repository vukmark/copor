import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {NoDataLogRepository} from '@copor/core/domain/Core/Logger/NoDataLogRepository';
import {
	FakeGetSystemSettingsLoggerRepo
} from '@copor/core/client/SystemSettings/GetSystemSettings/repo/fake/FakeGetSystemSettingsLoggerRepo';

export class GetSystemSettingsLoggerRepoPicker extends NewRepositoryPicker<NoDataLogRepository> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => NoDataLogRepository> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetSystemSettingsLoggerRepo
		};
	}
}
