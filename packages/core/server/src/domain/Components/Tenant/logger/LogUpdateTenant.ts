import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogUpdateTenant extends TypedLogger<LogDataForUpdateTenant> {
	getType(): string {
		return 'updateTenant';
	}
}

export interface LogDataForUpdateTenant {
	id: string;
	name: string;
	isBaseTenant: boolean;
	addressStreet: string;
	regionCityId: string;
	publishStatus: PublishStatus;
	email: string;
	phoneNumber?: string;
	contactName?: string;
	contactDepartment?: string;
	contactAddress?: string;
	contactPostalCode?: string;
	contactCity?: string;
	contactPhone?: string;
	contactEmail?: string;
}