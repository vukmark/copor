import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForMarkChatMessagesSeen {
	chatId: string;
}

export class LogMarkChatMessagesSeen extends TypedLogger<LogDataForMarkChatMessagesSeen> {
	getType(): string {
		return 'markChatMessagesSeen';
	}
}
