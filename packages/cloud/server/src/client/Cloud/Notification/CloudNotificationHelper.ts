import {Container} from '@copor/core/client/Interface/Container';
import {
	GetNotificationTokenListInteractorRepoPicker
} from '@copor/core/client/Components/NotificationToken/GetNotificationTokenList/repo/repoPicker/GetNotificationTokenListInteractorRepoPicker';
import {FirebaseCloudNotificationSender} from './FirebaseCloudNotificationSender';
import {KyselyCloudNotificationRecipientRepo} from './KyselyCloudNotificationRecipientRepo';
import {SendCloudNotificationService} from './SendCloudNotificationService';
import {webSocketHelper} from '@copor/core/client/Core/WebSocket/WebSocketHelper';

export class CloudNotificationHelper {
	static async send(container: Container, fileId: string, uploaderUserId: string): Promise<void> {
		const service = new SendCloudNotificationService(
			new KyselyCloudNotificationRecipientRepo(container.appContext),
			container.getNewRepoPicker(GetNotificationTokenListInteractorRepoPicker),
			new FirebaseCloudNotificationSender(),
			{
				send: (userIds, payload) => webSocketHelper.sendMessageWithPayload({event: 'CLOUD_NOTIFICATION', payload}, userIds)
			}
		);

		await service.execute(fileId, uploaderUserId);
	}
}
