import {SavePhoneNumberDTO} from '@copor/core/domain/Core/global/PhoneNumber/dto/SavePhoneNumberDTO';
import {Gender} from '@copor/core/domain/Core/enum/Gender';
import {AccountFormVariant} from '@copor/core/client/Core/Form/AccountFormVariant';

export interface UpdateUserAccountInformationReqBodyDTO {
	id?: string;
	firstName: string;
	lastName: string;
	addressId?: string;
	addressStreet?: string;
	postalCode?: string;
	city?: string;
	country?: string;
	state?: string;
	citizenship?: string;
	email?: string;
	salutation?: string;
	nickname?: string;
	phoneNumberList?: SavePhoneNumberDTO[];
	dateOfBirth?: Date;
	gender?: Gender;
	nativeLanguageId?: string;
	placeOfBirth?: string;
	qualifications?: string;
	contactNote?: string;
	formVariant?: AccountFormVariant;
}