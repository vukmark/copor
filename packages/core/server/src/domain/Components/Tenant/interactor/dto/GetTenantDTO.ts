import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
export interface GetTenantDTO {
	id: string;
	name: string;
	isBaseTenant: boolean;
	regionId: string;
	regionCityId: string;
	addressStreet: string;
	postalCode: string;
	city: string;
	countryName: string;
	countryId: string;
	stateName: string;
	stateId: string;
	publishStatus: PublishStatus;
	email: string;
	phone?: string;
	contactName?: string;
	contactDepartment?: string;
	contactAddress?: string;
	contactPostalCode?: string;
	contactCity?: string;
	contactPhone?: string;
	contactEmail?: string;
	latitude?: number;
	longitude?: number;
}
