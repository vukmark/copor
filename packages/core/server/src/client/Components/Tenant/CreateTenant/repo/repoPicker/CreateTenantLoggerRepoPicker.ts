import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateTenant} from '@copor/core/domain/Components/Tenant/logger/LogCreateTenant';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeCreateTenantLoggerRepo} from '../fake/FakeCreateTenantLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class CreateTenantLoggerRepoPicker extends NewRepositoryPicker<LogRepository<LogDataForCreateTenant>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext) => LogRepository<LogDataForCreateTenant>> {
		return {
			[DBEnv.FAKE]: FakeCreateTenantLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}
