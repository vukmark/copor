import {Generated} from './Generated';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export interface Tenant {
	id: string;
	addressStreet: string;
	city: string;
	contactAddressId: string | null;
	contactDepartment: string | null;
	contactEmail: string | null;
	contactName: string | null;
	contactPhone: string | null;
	email: string;
	isBaseTenant: Generated<number>;
	latitude: number | null;
	longitude: number | null;
	name: string;
	phoneNumber: string | null;
	regionId: string;
	regionCityId: string | null;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
	publishStatus: Generated<PublishStatus>;
}
