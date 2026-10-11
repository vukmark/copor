import {PhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/PhoneNumberDTO';

export interface GetContactInfoForUserViewModel {
	id: string;
	fullName: string;
	email: string;
	salutation?: string;
	picture?: string;
	address?: string;
	country?: string;
	state?: string;
	postalCode?: string;
	city?: string;
	phoneNumber?: PhoneNumberDTO[];
	tenantName?: string;
	tenantAddress?: string;
	tenantCountry?: string;
	tenantState?: string;
	tenantPostalCode?: string;
	tenantCity?: string;
	role?: string;
	jobTitle?: string;
	isActive?: boolean;
}
