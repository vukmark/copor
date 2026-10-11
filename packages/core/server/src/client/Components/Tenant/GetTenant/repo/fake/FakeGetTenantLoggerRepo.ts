import {LogRepository} from '@copor/core/domain/Core/Logger/LogRepository';
import {LogDataForGetTenant} from '@copor/core/domain/Components/Tenant/logger/LogGetTenant';
import {LogForSave} from '@copor/core/domain/Core/Logger/LogForSave';

export class FakeGetTenantLoggerRepo implements LogRepository<LogDataForGetTenant> {
	save(logDTO: LogForSave<LogDataForGetTenant>): Promise<void> {
		return new Promise(() => {
			return;
		});
	}
}
