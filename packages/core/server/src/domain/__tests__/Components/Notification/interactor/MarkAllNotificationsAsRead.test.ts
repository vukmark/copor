import {
	MarkAllNotificationsAsReadRepo
} from '@copor/core/domain/Components/Notification/repository/MarkAllNotificationsAsReadRepo';
import {MarkAllNotificationsAsRead} from '@copor/core/domain/Components/Notification/interactor/MarkAllNotificationsAsRead';

describe('mark all notifications as read interactor tests', () => {
	const mockRepo: jest.Mocked<MarkAllNotificationsAsReadRepo> = {
		markAllAsRead: jest.fn().mockResolvedValue(void 0)
	};
	const markAll: MarkAllNotificationsAsRead = new MarkAllNotificationsAsRead('uid', mockRepo);

	it('should mark all unread notifications as read for a user', async () => {
		await expect(markAll.execute()).resolves.toBeUndefined();

		expect(mockRepo.markAllAsRead).toHaveBeenCalledWith('uid');
		expect(mockRepo.markAllAsRead).toHaveBeenCalledTimes(1);
	});
});
