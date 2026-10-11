import {Gender} from '@copor/core/domain/Core/enum/Gender';
import {RoleType} from '@copor/core/domain/Core/enum/RoleType';

export interface SaveUserAccountInformationDTO {
	id: string;
	actorId: string;
	roleType: RoleType;
	firstName: string;
	lastName: string;
	email?: string;
	password: string;
	addressStreet?: string;
	postalCode?: string;
	city?: string;
	country?: string | null;
	state?: string | null;
	citizenship?: string | null;
	salutation?: string;
	nickname?: string;
	gender?: Gender;
	nativeLanguage?: string | null;
	placeOfBirth?: string;
	qualifications?: string;
}
