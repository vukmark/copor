import {GetChatInfoRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/GetChatInfoRepo';
import {GetChatInfoDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/GetChatInfoDTO';
import {GetChatInfo} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/GetChatInfo';


describe('Get ChatInfo tests', () => {
	const mockRepo: jest.Mocked<GetChatInfoRepo> = {
		load: jest.fn()
	};

	const expectedResponse: GetChatInfoDTO = {
		id: 'unique-id',
		name: 'Test Chat',
		firstName: 'John',
		lastName: 'Doe',
		isPrivate: true,
		chatPicture: 'chat-pic',
		chatPictureExtension: 'jpg',
		members: [
			{
				id: 'id',
				firstName: 'Alice',
				lastName: 'Smith',
				roleName: 'User',
				picture: 'alice',
				pictureExtension: 'png'
			}
		]
	};
	const getChatInfo: GetChatInfo = new GetChatInfo('unique-id', mockRepo);

	it('Should return ChatInfo based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getChatInfo.execute()).toEqual(expectedResponse);
	});
});