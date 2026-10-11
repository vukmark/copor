import {NotificationTokenType} from '@copor/core/domain/Core/enum/NotificationTokenType';
import {GetNotificationTokenList} from '@copor/core/domain/Components/NotificationToken/interactor/GetNotificationTokenList';
import {
	GetNotificationTokenListRepo
} from '@copor/core/domain/Components/NotificationToken/repository/GetNotificationTokenListRepo';
import {GetNotificationTokenDTO} from '@copor/core/domain/Components/NotificationToken/interactor/dto/GetNotificationTokenDTO';

describe('get notification token list interactor tests', () => {
	const mockRepo: jest.Mocked<GetNotificationTokenListRepo> = {
		load: jest.fn()
	};
	const mockedReturnNotificationTokenList: GetNotificationTokenDTO[] = [{
		token: 'token',
		user: 'uid',
		type: NotificationTokenType.IOS
	}];
	const getNotificationTokenList: GetNotificationTokenList = new GetNotificationTokenList(['asda'], mockRepo);

	it('should return list of notification tokens for given user', async () => {
		mockRepo.load.mockResolvedValue(mockedReturnNotificationTokenList);
		expect(await getNotificationTokenList.execute()).toStrictEqual(mockedReturnNotificationTokenList);
	});
});
