import {DeleteNotificationToken} from '@copor/core/domain/Components/NotificationToken/interactor/DeleteNotificationToken';
import {DeleteNotificationTokenRepo} from '@copor/core/domain/Components/NotificationToken/repository/DeleteNotificationTokenRepo';

describe('delete notification test', () => {
	const mockRepo: jest.Mocked<DeleteNotificationTokenRepo> = {
		delete: jest.fn()
	};
	const deleteNotificationToken = new DeleteNotificationToken('notificationTokenId', mockRepo);

	it('should delete a notification token', async () => {
		await deleteNotificationToken.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('notificationTokenId');
	});
});