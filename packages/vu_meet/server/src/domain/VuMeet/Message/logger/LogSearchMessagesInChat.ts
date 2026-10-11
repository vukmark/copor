import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForSearchMessagesInChat {
	prompt: string;
}

export class LogSearchMessagesInChat extends TypedLogger<LogDataForSearchMessagesInChat> {
	getType(): string {
		return 'searchMessagesInChat';
	}
}
