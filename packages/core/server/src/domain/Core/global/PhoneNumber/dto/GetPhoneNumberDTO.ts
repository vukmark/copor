import {PhoneNumberType} from '../PhoneNumberType';

export interface GetPhoneNumberDTO {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}