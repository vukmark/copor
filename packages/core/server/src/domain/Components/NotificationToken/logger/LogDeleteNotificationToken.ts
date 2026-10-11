import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';

export class LogDeleteNotificationToken extends TypedLogger<LogDataForDeleteNotificationToken> {
	getType(): string {
		return 'deleteNotificationToken';
	}
}

export interface LogDataForDeleteNotificationToken {
	tokenId: string;
}