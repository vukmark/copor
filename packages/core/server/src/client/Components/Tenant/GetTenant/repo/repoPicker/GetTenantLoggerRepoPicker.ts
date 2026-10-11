import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetTenant} from '@copor/core/domain/Components/Tenant/logger/LogGetTenant';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeGetTenantLoggerRepo} from '../fake/FakeGetTenantLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class GetTenantLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForGetTenant>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForGetTenant>> {
		return {
			[DBEnv.KYSELY]: KyselyLogRepository,
			[DBEnv.FAKE]: FakeGetTenantLoggerRepo
		};
	}
}
