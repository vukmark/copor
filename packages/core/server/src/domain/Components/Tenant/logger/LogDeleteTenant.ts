import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForDeleteTenant {
	tenantId: string;
}

export class LogDeleteTenant extends TypedLogger<LogDataForDeleteTenant> {
	getType(): string {
		return 'deleteTenant';
	}
}