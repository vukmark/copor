import {UpdateChat} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/UpdateChat';
import {SaveChatRepo} from '@copor/vu_meet/domain/VuMeet/Chat/repository/SaveChatRepo';
import {SaveChatDTO} from '@copor/vu_meet/domain/VuMeet/Chat/interactor/dto/SaveChatDTO';

describe('update Chat tests', () => {
	let mockRepo: jest.Mocked<SaveChatRepo>;
	let inputDTO: SaveChatDTO;
	let updateChat: UpdateChat;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'some-id',
			userList: ['dasda', 'dasdasfd'],
			actorId: 'gojko',
			name: 'Chet'
		};
		updateChat = new UpdateChat(inputDTO, mockRepo);
	});
	it('should save data for update', async () => {
		await updateChat.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
