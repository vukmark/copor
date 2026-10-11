import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForCreateTenant} from '@copor/core/domain/Components/Tenant/logger/LogCreateTenant';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeCreateTenantLoggerRepo implements LogRepository<LogDataForCreateTenant> {
	save(logDTO: LogForSave<LogDataForCreateTenant>): Promise<void> {
		return Promise.resolve();
	}
}
