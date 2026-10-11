import {SearchAllMessages} from '@copor/vu_meet/domain/VuMeet/Core/interactor/SearchAllMessages';
import {SearchAllMessagesInputDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/SearchAllMessagesInputDTO';
import {SearchAllMessagesRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/SearchAllMessagesRepo';
import {SearchAllMessagesDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/SearchAllMessagesDTO';

describe('search all messages interactor tests', () => {
	const mockRepo: jest.Mocked<SearchAllMessagesRepo> = {
		search: jest.fn()
	};
	const expectedResponse: SearchAllMessagesDTO[] = [
		{
			chatId: 'cid',
			chatName: 'name',
			chatPicture: 'picture',
			isPrivate: true,
			messageId: 'mid',
			senderId: 'sid',
			senderName: 'senderName',
			messageContent: 'cont',
			senderPicture: 'picture',
			createdAt: new Date(1, 1, 1002, 21, 33, 2, 2)
		}
	];
	const input: SearchAllMessagesInputDTO = {
		actorId: 'aid',
		prompt: 'pr'
	};
	const searchAllMessages: SearchAllMessages = new SearchAllMessages(input, mockRepo);

	it('should list expected response', async () => {
		mockRepo.search.mockResolvedValue(expectedResponse);
		expect(await searchAllMessages.execute()).toEqual(expectedResponse);
	});
});
