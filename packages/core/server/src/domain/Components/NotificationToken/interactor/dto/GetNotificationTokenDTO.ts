import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export interface GetNotificationTokenDTO {
	token: string;
	user: string;
	type: NotificationTokenType;
}
