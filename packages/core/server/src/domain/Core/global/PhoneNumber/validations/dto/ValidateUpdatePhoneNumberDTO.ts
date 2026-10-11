import {PhoneNumberType} from '../../PhoneNumberType';

export interface ValidateUpdatePhoneNumberDTO {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
	actorId: string;
}