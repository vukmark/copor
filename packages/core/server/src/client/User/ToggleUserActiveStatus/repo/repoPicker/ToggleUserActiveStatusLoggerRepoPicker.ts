import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';
import {LogDataForToggleUserActiveStatus} from '@copor/core/domain/User/logger/LogToggleUserActiveStatus';
import {
	FakeToggleUserActiveStatusLoggerRepo
} from '@copor/core/client/User/ToggleUserActiveStatus/repo/fake/FakeToggleUserActiveStatusLoggerRepo';

export class ToggleUserActiveStatusLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForToggleUserActiveStatus>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForToggleUserActiveStatus>> {
		return {
			[DBEnv.FAKE]: FakeToggleUserActiveStatusLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
