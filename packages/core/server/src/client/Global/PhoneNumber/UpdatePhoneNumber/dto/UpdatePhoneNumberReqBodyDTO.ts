import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export interface UpdatePhoneNumberReqBodyDTO {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}
