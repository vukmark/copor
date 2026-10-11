import {NotificationTokenType} from '../../../../Core/enum/NotificationTokenType';

export interface ValidateCreateNotificationTokenDTO {
	userId: string;
	type: NotificationTokenType;
	token: string;
}
