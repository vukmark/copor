import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetMessageList {
	chatId: string;
}

export class LogGetMessageList extends TypedLogger<LogDataForGetMessageList> {
	getType(): string {
		return 'getMessageList';
	}
}
