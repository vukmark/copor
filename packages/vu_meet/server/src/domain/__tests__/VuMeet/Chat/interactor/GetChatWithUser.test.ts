import {GetChatWithUser} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatWithUser';
import {GetChatWithUserInputDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatWithUserInputDTO';
import {GetChatWithUserRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatWithUserRepo';
import {
	GetChatWithUserResponseDTO
} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatWithUserResponseDTO';

describe('get private chat with user interactor tests', () => {
	const mockRepo: jest.Mocked<GetChatWithUserRepo> = {
		load: jest.fn()
	};
	const input: GetChatWithUserInputDTO = {
		actorId: 'aid',
		users: ['user1', 'user2'],
		uniqueId: 'uniqueId',
		groupName: 'groupName'
	};
	const expectedResponse: GetChatWithUserResponseDTO = {
		chatId: 'cid',
		userFirstName: 'ufn',
		userLastName: 'uln',
		userPictureExtension: 'upe',
		userPictureName: 'upn'
	};
	const getChatWithUser: GetChatWithUser = new GetChatWithUser(input, mockRepo);

	it('should return expected result', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse as unknown as string);
		expect(await getChatWithUser.execute()).toEqual(expectedResponse);
	});
});
