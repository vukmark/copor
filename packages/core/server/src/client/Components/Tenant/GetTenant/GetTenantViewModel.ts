import {NameAndIdDTO} from '@copor/core/domain/Core/NamedIdDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface GetTenantViewModel {
	id: string;
	name: string;
	isBaseTenant: boolean;
	address: string;
	postalCode: string;
	city: string;
	country?: NameAndIdDTO;
	state?: NameAndIdDTO;
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
	latitude?: number;
	longitude?: number;
}
