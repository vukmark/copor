import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {Gender} from '@copor/core/domain/Core/enum/Gender';

export interface UpdateUserAccountInformationDTO {
	id: string;
	firstName: string;
	lastName: string;
	userName?: string;
	addressId?: string;
	addressStreet?: string;
	postalCode?: string;
	city?: string;
	country?: string | null;
	state?: string | null;
	citizenship?: string | null;
	email?: string;
	salutation?: string;
	nickname?: string;
	picture?: string;
	actorId: string;
	phoneNumberList?: SavePhoneNumberDTO[];
	gender?: Gender;
	nativeLanguage?: string | null;
	contactNote?: string;
	placeOfBirth?: string;
	qualifications?: string;
}
