import {Generated} from './Generated';

export interface Address {
	id: string;
	city: string | null;
	country: string | null;
	postalCode: string | null;
	state: string | null;
	streetAddress: string | null;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
