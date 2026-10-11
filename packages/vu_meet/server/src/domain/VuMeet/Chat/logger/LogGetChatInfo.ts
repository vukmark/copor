import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogGetChatInfo extends TypedLogger<LogDataForGetChatInfo> {
	public getType(): string {
		return 'getChatInfo';
	}
}

export interface LogDataForGetChatInfo {
	chatId: string;
}