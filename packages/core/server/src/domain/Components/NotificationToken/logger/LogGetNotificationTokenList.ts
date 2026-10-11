import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetNotificationTokenList {
	userId: string;
}

export class LogGetNotificationTokenList extends TypedLogger<LogDataForGetNotificationTokenList> {
	getType(): string {
		return 'getNotificationTokenList';
	}
}
