import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';

export interface CountUnreadNotificationsRepo {
	countUnread(userId: string): Promise<GetNotificationCounterDTO>;
}