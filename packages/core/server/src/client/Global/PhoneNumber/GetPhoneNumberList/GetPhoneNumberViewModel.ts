import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export interface GetPhoneNumberViewModel {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}