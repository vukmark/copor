import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SaveTenantDTO {
	id: string;
	name: string;
	isBaseTenant: boolean;
	addressStreet: string;
	city: string;
	regionCityId: string;
	publishStatus: PublishStatus;
	email: string;
	phone?: string;
	contractSignedBy?: string;
	contactName?: string;
	contactDepartment?: string;
	contactAddressStreet?: string;
	contactPostalCode?: string;
	contactCity?: string;
	contactPhone?: string;
	contactEmail: string;
	actorId: string;
	latitude?: number;
	longitude?: number;
}
