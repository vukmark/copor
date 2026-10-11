import {PhoneNumberType} from '../PhoneNumberType';
import {TypedLogger} from '../../../Logger/Logger';

export class LogUpdatePhoneNumber extends TypedLogger<LogDataForUpdatePhoneNumber[]> {
	getType(): string {
		return 'updatePhoneNumber';
	}
}

export interface LogDataForUpdatePhoneNumber {
	id: string;
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}