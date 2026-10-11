import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';
import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {GetAllNotificationTokens} from '@copor/core/domain/Components/NotificationToken/interactor/GetAllNotificationTokens';
import {
	GetAllNotificationTokensRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetAllNotificationTokensRepo';

describe('get all notification tokens except for current user tests', () => {
	const mockRepo: jest.Mocked<GetAllNotificationTokensRepo> = {
		load: jest.fn()
	};
	let getAllNotificationTokens: GetAllNotificationTokens;

	it('should return list of notification tokens', async () => {
		const mockedResponse: GetNotificationTokenDTO[] = [{
			user: 'uid',
			type: NotificationTokenType.IOS,
			token: 'token'
		}];

		mockRepo.load.mockResolvedValue(mockedResponse);
		getAllNotificationTokens = new GetAllNotificationTokens('uid', mockRepo);
		const response = await getAllNotificationTokens.execute();

		expect(response).toEqual(mockedResponse);
	});
});
