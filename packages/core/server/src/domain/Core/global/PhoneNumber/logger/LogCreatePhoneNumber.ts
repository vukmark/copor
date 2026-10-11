import {TypedLogger} from '../../../Logger/Logger';
import {PhoneNumberType} from '../PhoneNumberType';

export interface LogDataForCreatePhoneNumber {
	user: string;
	phoneNumber: string;
	phoneNumberType: PhoneNumberType;
}

export class LogCreatePhoneNumber extends TypedLogger<LogDataForCreatePhoneNumber[]> {
	public getType(): string {
		return 'createPhoneNumber';
	}
}