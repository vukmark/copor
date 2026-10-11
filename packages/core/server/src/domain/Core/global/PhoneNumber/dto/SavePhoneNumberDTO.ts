import {PhoneNumberType} from '../PhoneNumberType';

export interface SavePhoneNumberDTO {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
	actorId: string;
}