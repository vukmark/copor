import {PhoneNumberType} from '../../PhoneNumberType';

export interface ValidateCreatePhoneNumberDTO {
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
	actorId: string;
}