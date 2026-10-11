import {TypedLogger} from '../../../Logger/Logger';

export interface LogDataForDeletePhoneNumber {
	id: string;
}

export class LogDeletePhoneNumber extends TypedLogger<LogDataForDeletePhoneNumber> {
	getType(): string {
		return 'deletePhoneNumber';
	}
}