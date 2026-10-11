import {TypedLogger} from '@copor/core/domain/Core/Logger/Logger';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export interface LogDataForCreateNotificationToken {
	id: string;
	token: string;
	userId: string;
	type: NotificationTokenType;
}

export class LogCreateNotificationToken extends TypedLogger<LogDataForCreateNotificationToken> {
	getType(): string {
		return 'createNotificationToken';
	}
}
