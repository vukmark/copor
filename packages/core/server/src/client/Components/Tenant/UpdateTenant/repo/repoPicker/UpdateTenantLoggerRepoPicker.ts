import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeUpdateTenantLoggerRepo} from '../fake/FakeUpdateTenantLoggerRepo';
import {LogDataForUpdateTenant} from '@copor/core/domain/Components/Tenant/logger/LogUpdateTenant';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class UpdateTenantLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForUpdateTenant>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForUpdateTenant>> {
		return {
			[DBEnv.FAKE]: FakeUpdateTenantLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
