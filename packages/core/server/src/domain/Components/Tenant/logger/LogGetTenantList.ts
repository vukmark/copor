import {NoDataLogger} from '@copor/core/domain/Core/Logger/NoDataLogger';

export class LogGetTenantList extends NoDataLogger {
	getType(): string {
		return 'getTenantList';
	}
}
