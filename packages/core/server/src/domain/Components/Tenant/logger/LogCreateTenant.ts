import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';


export class LogCreateTenant extends TypedLogger<LogDataForCreateTenant> {
	getType(): string {
		return 'createTenant';
	}
}

export interface LogDataForCreateTenant {
	id: string;
	name: string;
	isBaseTenant: boolean;
	addressStreet: string;
	regionCityId: string;
	publishStatus: PublishStatus;
	email: string;
	phoneNumber?: string;
	contract?: string;
	contractSignedBy?: string;
	contractFileName?: string;
	contactName?: string;
	contactDepartment?: string;
	contactAddress?: string;
	contactPostalCode?: string;
	contactCity?: string;
	contactPhone?: string;
	contactEmail?: string;
}
