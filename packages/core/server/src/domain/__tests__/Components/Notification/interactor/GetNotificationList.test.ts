import {GetNotificationList} from '@copor/core/domain/Components/Notification/interactor/GetNotificationList';
import {GetNotificationListRepo} from '@copor/core/domain/Components/Notification/repository/GetNotificationListRepo';
import {GetNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/GetNotificationDTO';

describe('get notification list interactor tests', () => {
	const mockRepo: jest.Mocked<GetNotificationListRepo> = {
		load: jest.fn()
	};
	const mockedReturn: GetNotificationDTO[] = [
		{
			id: 'id',
			title: 'title',
			description: 'sed',
			user: 'uid',
			seen: false
		}
	];
	const getNotificationList: GetNotificationList = new GetNotificationList('uid', mockRepo);

	it('should return list of notifications for user', async () => {
		mockRepo.load.mockResolvedValue(mockedReturn);
		expect(await getNotificationList.execute()).toStrictEqual(mockedReturn);
	});
});
