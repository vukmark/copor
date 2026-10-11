import {GetUnreadMessageCountForUser} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetUnreadMessageCountForUser';
import {GetUnreadMessageCountForUserRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUnreadMessageCountForUserRepo';
import {GetUnreadMessageCountForUserDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUnreadMessageCountForUserDTO';

describe('get unread message count for user interactor tests', () => {
	const mockRepo: jest.Mocked<GetUnreadMessageCountForUserRepo> = {
		getUnreadMessageCountForUser: jest.fn()
	};
	const expectedResult: GetUnreadMessageCountForUserDTO = {
		unreadMessages: 1,
		lastMessageChatName: 'chatName',
		lastMessageContent: 'cont',
		lastMessageChatPictureName: 'picture',
		lastMessageChatId: 'cid',
		lastMessageIsChatPrivate: true
	};

	it('should return expected result', async () => {
		mockRepo.getUnreadMessageCountForUser.mockResolvedValue(expectedResult);
		const getUnreadMessageCountForUser = new GetUnreadMessageCountForUser('userId', mockRepo);

		expect(await getUnreadMessageCountForUser.execute()).toEqual(expectedResult);
	});
});
