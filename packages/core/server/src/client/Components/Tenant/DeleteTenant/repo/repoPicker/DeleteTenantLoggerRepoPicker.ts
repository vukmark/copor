import {NewRepositoryPicker} from '@copor/core/client/Core/RepositoryPicker';
import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteTenant} from '@copor/core/domain/Components/Tenant/logger/LogDeleteTenant';
import {AppContext} from '@copor/core/client/Interface/AppContext';
import {DBEnv} from '@copor/core/client/enum/DBEnv';
import {FakeDeleteTenantLoggerRepo} from '../fake/FakeDeleteTenantLoggerRepo';
import {KyselyLogRepository} from '@copor/core/client/Core/Logger/KyselyLogRepository';

export class DeleteTenantLoggerRepoPicker
	extends NewRepositoryPicker<LogRepository<LogDataForDeleteTenant>> {
	protected getRepositoryList(): Record<string, new (appContext: AppContext)
	=> LogRepository<LogDataForDeleteTenant>> {
		return {
			[DBEnv.FAKE]: FakeDeleteTenantLoggerRepo,
			[DBEnv.KYSELY]: KyselyLogRepository
		};
	}
}