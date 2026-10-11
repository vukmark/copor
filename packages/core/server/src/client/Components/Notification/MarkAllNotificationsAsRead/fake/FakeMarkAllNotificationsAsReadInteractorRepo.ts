import {MarkAllNotificationsAsReadRepo} from '@copor/core/domain/Components/Notification/repository/MarkAllNotificationsAsReadRepo';

export class FakeMarkAllNotificationsAsReadInteractorRepo implements MarkAllNotificationsAsReadRepo {
	public markAllAsRead(userId: string): Promise<void> {
		return Promise.resolve();
	}
}
