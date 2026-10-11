import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export interface LogDataForGetChatWithUser {
	users: string[];
}

export class LogGetChatWithUser extends TypedLogger<LogDataForGetChatWithUser> {
	getType(): string {
		return 'getChatWithUser';
	}
}
