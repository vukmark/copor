import {Gender} from '@copor/core/domain/Core/enum/Gender';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';
import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';

export interface CreateUserAccountInformationReqBodyDTO {
	roleType: RoleType;
	firstName: string;
	lastName: string;
	email?: string;
	password: string;
	addressStreet?: string;
	postalCode?: string;
	city?: string;
	country?: string;
	state?: string;
	citizenship?: string;
	salutation?: string;
	nickname?: string;
	phoneNumberList: SavePhoneNumberDTO[];
	gender?: Gender;
	nativeLanguage?: string;
	placeOfBirth?: string;
	qualifications?: string;
}
