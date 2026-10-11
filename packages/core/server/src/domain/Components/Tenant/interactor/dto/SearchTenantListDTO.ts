import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface SearchTenantListDTO {
	id: string;
	name: string;
	isBaseTenant: boolean;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	state: string;
	publishStatus: PublishStatus;
	email: string;
	phoneNumber?: string;
	contractSignedBy?: string;
	contactName?: string;
	contactDepartment?: string;
	contactAddress?: string;
	contactPostalCode?: string;
	contactCity?: string;
	contactPhone?: string;
	contactEmail?: string;
}