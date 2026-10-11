import {Gender} from '../../../Core/enum/Gender';

export interface SavePersonalDataDTO {
	id: string;
	actorId: string;
	firstName: string;
	lastName: string;
	password: string;
	userRole: string;
	salutation?: string;
	nickName?: string;
	dateOfBirth?: string;
	placeOfBirth: string;
	gender: Gender;
	picture?: string;
	address?: string;
	postalCode?: string;
	city?: string;
	state?: string;
	country?: string;
	citizenship?: string;
	nativeLanguage: string;
	timeZone2FA?: string;
	email?: string;
	phoneHome?: string;
	phoneMobile?: string;
	noteForContacts?: string;
}
