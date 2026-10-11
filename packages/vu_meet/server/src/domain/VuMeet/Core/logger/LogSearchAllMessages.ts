import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForSearchAllMessages {
	prompt: string;
}

export class LogSearchAllMessages extends TypedLogger<LogDataForSearchAllMessages> {
	getType(): string {
		return 'searchAllMessages';
	}
}
