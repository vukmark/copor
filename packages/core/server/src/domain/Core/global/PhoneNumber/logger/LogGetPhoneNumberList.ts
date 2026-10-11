import {TypedLogger} from '../../../Logger/Logger';

export class LogGetPhoneNumberList extends TypedLogger<LogDataForGetPhoneNumberList> {
	getType(): string {
		return 'getPhoneNumberList';
	}
}

export interface LogDataForGetPhoneNumberList {
	userId: string;
}