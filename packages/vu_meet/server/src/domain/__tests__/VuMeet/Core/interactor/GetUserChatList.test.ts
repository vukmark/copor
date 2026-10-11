import {GetUserChatList} from '@copor/vu_meet/domain/VuMeet/Core/interactor/GetUserChatList';
import {GetUserChatListRepo} from '@copor/vu_meet/domain/VuMeet/Core/repository/GetUserChatListRepo';
import {GetUserChatDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatDTO';
import {GetUserChatListInputDTO} from '@copor/vu_meet/domain/VuMeet/Core/interactor/dto/GetUserChatListInputDTO';

describe('get user chat list interactor tests', () => {
	const mockRepo: jest.Mocked<GetUserChatListRepo> = {
		list: jest.fn()
	};
	const expectedResponse: GetUserChatDTO[] = [{
		id: 'id',
		name: 'name',
		pictureName: 'picture',
		lastMessage: 'lastMessage',
		createdAt: new Date(22, 4, 2020, 13, 34),
		isPrivate: true,
		numberOfUnseenMessages: 2
	}];
	const input: GetUserChatListInputDTO = {
		userId: 'uid',
		prompt: 'prompt'
	};
	const getUserChatList: GetUserChatList = new GetUserChatList(input, mockRepo);

	it('should return expected result', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getUserChatList.execute()).toEqual(expectedResponse);
	});
});
