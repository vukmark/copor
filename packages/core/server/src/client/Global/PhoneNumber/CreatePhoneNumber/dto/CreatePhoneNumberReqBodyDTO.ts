import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export interface CreatePhoneNumberReqBodyDTO {
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}