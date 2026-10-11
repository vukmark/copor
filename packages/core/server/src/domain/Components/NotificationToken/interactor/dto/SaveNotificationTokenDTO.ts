import {NotificationTokenType} from '../../../../Core/enum/NotificationTokenType';

export interface SaveNotificationTokenDTO {
	id: string;
	user: string;
	token: string;
	type: NotificationTokenType;
}
