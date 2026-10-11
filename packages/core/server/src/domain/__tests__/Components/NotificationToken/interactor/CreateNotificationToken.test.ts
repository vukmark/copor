import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {
	SaveNotificationTokenDTO
} from '@copor/core/domain/Components/NotificationToken/interactor/dto/SaveNotificationTokenDTO';
import {CreateNotificationToken} from '@copor/core/domain/Components/NotificationToken/interactor/CreateNotificationToken';
import {SaveNotificationTokenRepo} from '@copor/core/domain/Components/NotificationToken/repository/SaveNotificationTokenRepo';

describe('create notification token interactor tests', () => {
	let createNotificationToken: CreateNotificationToken;
	let mockRepo: jest.Mocked<SaveNotificationTokenRepo>;
	let input: SaveNotificationTokenDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			user: 'uId',
			token: 'token',
			type: NotificationTokenType.ANDROID
		};
		createNotificationToken = new CreateNotificationToken(input, mockRepo);
	});

	it('Should save an notification token', async () => {
		const result = await createNotificationToken.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
