import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForDeleteTenant} from '@copor/core/domain/Components/Tenant/logger/LogDeleteTenant';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeDeleteTenantLoggerRepo implements LogRepository<LogDataForDeleteTenant> {
	save(logDTO: LogForSave<LogDataForDeleteTenant>): Promise<void> {
		return Promise.resolve();
	}
}