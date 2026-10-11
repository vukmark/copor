import {SearchMessagesInChat} from '@copor/vu_meet/domain/VuMeet/Message/interactor/SearchMessagesInChat';
import {
	SearchMessagesInChatRepo
} from '@copor/vu_meet/domain/VuMeet/Message/repository/SearchMessagesInChatRepo';
import {SearchMessagesInChatInputDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatInputDTO';
import {
	SearchMessagesInChatDTO
} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SearchMessagesInChatDTO';

describe('search messages in private chat interactor tests', () => {
	const mockRepo: jest.Mocked<SearchMessagesInChatRepo> = {
		search: jest.fn()
	};
	const expectedResponse: SearchMessagesInChatDTO[] = [{
		messageId: 'mid',
		messageContent: 'mc',
		messageType: 'type',
		senderId: 'sid',
		senderFirstName: 'firstName',
		senderLastName: 'lastName',
		senderProfileImagePath: 'profilee/image/path',
		messageSeen: false,
		createdAt: new Date(1, 1, 2001, 1, 1, 1)
	}];
	const input: SearchMessagesInChatInputDTO = {
		chatId: 'cid',
		prompt: 'prompt'
	};
	const searchMessagesInChat: SearchMessagesInChat = new SearchMessagesInChat(input, mockRepo);

	it('should return expected response', async () => {
		mockRepo.search.mockResolvedValue(expectedResponse);
		expect(await searchMessagesInChat.execute()).toEqual(expectedResponse);
	});
});
