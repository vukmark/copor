import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {PushNotificationResult} from '@copor/core/client/Core/Helpers/PushNotificationHelper';

export interface CloudNotificationMessage {
	title: string;
	body: string;
	data?: Record<string, string>;
}

export interface CloudNotificationSender {
	send(tokens: GetNotificationTokenDTO[], message: CloudNotificationMessage): Promise<PushNotificationResult>;
}
