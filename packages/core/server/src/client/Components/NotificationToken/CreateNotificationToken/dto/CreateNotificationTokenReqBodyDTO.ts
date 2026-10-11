import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';

export interface CreateNotificationTokenReqBodyDTO {
	token: string;
	type: NotificationTokenType;
}
