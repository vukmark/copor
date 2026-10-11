import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetTenant {
	tenantId: string;
}

export class LogGetTenant extends TypedLogger<LogDataForGetTenant> {
	getType(): string {
		return 'getTenant';
	}
}
