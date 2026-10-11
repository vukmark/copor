import {PushNotificationHelper, PushNotificationResult} from '@copor/core/client/Core/Helpers/PushNotificationHelper';
import {
	CloudNotificationMessage,
	CloudNotificationSender
} from './CloudNotificationSender';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';

export class FirebaseCloudNotificationSender implements CloudNotificationSender {
	async send(tokens: GetNotificationTokenDTO[], message: CloudNotificationMessage): Promise<PushNotificationResult> {
		return await PushNotificationHelper.send({
			notification: {
				title: message.title,
				body: message.body
			},
			data: message.data,
			android: {
				notification: {
					channelId: 'high_importance_channel',
					sound: 'default'
				}
			},
			apns: {
				payload: {
					aps: {
						sound: 'default'
					}
				}
			},
			webpush: {
				headers: {Urgency: 'high'}
			},
			tokenList: tokens
		});
	}
}
