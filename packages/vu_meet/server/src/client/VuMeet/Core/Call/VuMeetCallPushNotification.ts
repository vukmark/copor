import {PushNotificationHelper} from '@copor/core/client/Core/Helpers/PushNotificationHelper';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';

export interface SendVuMeetCallPushNotificationDTO {
	[key: string]: string;
	type: string;
	callerName: string;
	chatId: string;
	hasVideo: string;
	avatar: string;
	durationSeconds: string;
}

export interface SendVuMeetDeclineCallNotificationDTO {
	[key: string]: string;
	type: string;
	chatId: string;
	numberOfDeclinedCalls: string;
	declinerName: string;
}

export interface SendVuMeetTerminateCalling {
	[key: string]: string;
	type: string;
	chatId: string;
	declinerName: string;
}

export type VuMeetCallNotificationDTO =
	SendVuMeetCallPushNotificationDTO | SendVuMeetDeclineCallNotificationDTO | SendVuMeetTerminateCalling;

export class VuMeetCallPushNotification {
	// A data-only, high-priority background push, so the app can show the
	// incoming-call UI itself.
	public static async send(tokenList: GetNotificationTokenDTO[], data: VuMeetCallNotificationDTO) {
		await PushNotificationHelper.send({
			data: data,
			tokenList: tokenList,
			apns: {
				payload: {
					aps: {
						contentAvailable: true
					}
				},
				headers: {
					'apns-push-type': 'background',
					'apns-priority': '10'
				}
			}
		});
	}
}
