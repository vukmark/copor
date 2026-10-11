import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export interface GetNotificationTokenViewModel {
	token: string;
	type: NotificationTokenType;
	user: string;
}
