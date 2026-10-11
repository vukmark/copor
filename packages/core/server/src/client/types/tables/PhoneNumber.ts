import {Generated} from './Generated';
import {PhoneNumberType} from '@copor/core/domain/Core/global/PhoneNumber/PhoneNumberType';

export interface PhoneNumber {
	id: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
	userId: string;
	createdAt: Generated<Date>;
	createdBy: string;
	modifiedAt: Generated<Date>;
	modifiedBy: string;
}
