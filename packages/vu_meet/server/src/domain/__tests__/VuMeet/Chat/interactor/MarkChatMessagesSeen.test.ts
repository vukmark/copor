import {MarkChatMessagesSeenRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/MarkChatMessagesSeenRepo';
import {MarkChatMessagesSeenDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/MarkChatMessagesSeenDTO';
import {MarkChatMessagesSeen} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/MarkChatMessagesSeen';

describe('mark private chat messages seen interactor tests', () => {
	const mockRepo: jest.Mocked<MarkChatMessagesSeenRepo> = {
		markChatMessagesRead: jest.fn()
	};
	const input: MarkChatMessagesSeenDTO = {
		userId: 'uid',
		chatId: 'cid'
	};
	const markChatMessagesSeen: MarkChatMessagesSeen = new MarkChatMessagesSeen(input, mockRepo);

	it('should make all messages seen', async () => {
		await markChatMessagesSeen.execute();
		expect(mockRepo.markChatMessagesRead).toHaveBeenCalledWith(input.chatId, input.userId);
	});
});
