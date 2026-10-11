import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';
import {GetMessageList} from '@copor/vu_meet/domain/VuMeet/Message/interactor/GetMessageList';
import {GetMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageDTO';
import {GetMessageListRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/GetMessageListRepo';
import {GetMessageInputDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/GetMessageInputDTO';

describe('get private messages from chat interactor tests', () => {
	const mockRepo: jest.Mocked<GetMessageListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetMessageDTO[] = [{
		id: '123',
		content: 'Some message',
		type: MessageContentType.TEXT,
		senderId: 'senderId',
		senderLastName: 'lastName',
		senderFirstName: 'firstName',
		senderPictureName: 'picture',
		seen: true,
		createdAt: new Date(1, 1, 2025, 12, 0, 0),
		isPrivate: true
	}];
	const input: GetMessageInputDTO = {
		actorId: 'aaa',
		chatId: 'aaaa',
		beforeDate: '10.10.2020',
		afterDate: '11.11.2025'
	};
	const getMessageList: GetMessageList = new GetMessageList(input, mockRepo);

	it('should list all messages from chat', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getMessageList.execute()).toEqual(expectedResponse);
	});
});
