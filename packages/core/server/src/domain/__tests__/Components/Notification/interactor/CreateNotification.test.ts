import {CreateNotification} from '@copor/core/domain/Components/Notification/interactor/CreateNotification';
import {SaveNotificationRepo} from '@copor/core/domain/Components/Notification/repository/SaveNotificationRepo';
import {SaveNotificationDTO} from '@copor/core/domain/Components/Notification/interactor/dto/SaveNotificationDTO';

interface TestTranslationData {
	author: string;
}

describe('create notification interactor tests', () => {
	let createNotification: CreateNotification<TestTranslationData>;
	let mockRepo: jest.Mocked<SaveNotificationRepo<SaveNotificationDTO<TestTranslationData>>>;
	let input: SaveNotificationDTO<TestTranslationData>;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			userId: 'uId',
			title: 'title',
			seen: false,
			description: 'some description',
			translationData: {author: 'Simo'}
		};
		createNotification = new CreateNotification(input, mockRepo);
		mockRepo.save.mockResolvedValue('unique-id');
	});

	it('Should save an notification', async () => {
		const result = await createNotification.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
