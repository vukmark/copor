import {CountUnreadNotificationsRepo} from '@copor/core/domain/Components/Notification/repository/CountUnreadNotificationsRepo';
import {CountUnreadNotifications} from '@copor/core/domain/Components/Notification/interactor/CountUnreadNotifications';
import {GetNotificationCounterDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationCounterDTO';

describe('count unread notifications interactor tests', () => {
	const mockRepo: jest.Mocked<CountUnreadNotificationsRepo> = {
		countUnread: jest.fn()
	};
	const mockedReturn: GetNotificationCounterDTO = {
		vuMeet: 3,
		todo: 1
	};
	const countUnreadNotifications: CountUnreadNotifications = new CountUnreadNotifications('uid', mockRepo);

	it('should return count of unread notifications for user', async () => {
		mockRepo.countUnread.mockResolvedValue(mockedReturn);
		expect(await countUnreadNotifications.execute()).toStrictEqual(mockedReturn);
	});
});
