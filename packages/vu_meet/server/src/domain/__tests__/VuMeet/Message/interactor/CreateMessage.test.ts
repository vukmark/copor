import {CreateMessage} from '@copor/vu_meet/domain/VuMeet/Message/interactor/CreateMessage';
import {SaveMessageRepo} from '@copor/vu_meet/domain/VuMeet/Message/repository/SaveMessageRepo';
import {SaveMessageDTO} from '@copor/vu_meet/domain/VuMeet/Message/interactor/dto/SaveMessageDTO';
import {MessageContentType} from '@copor/vu_meet/domain/VuMeet/Core/enum/MessageContentType';

describe('Create private message interactor tests', () => {
	let inputDTO: SaveMessageDTO;
	let mockRepo: jest.Mocked<SaveMessageRepo>;
	let createMessage: CreateMessage;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'unique-id',
			content: 'message content',
			type: MessageContentType.TEXT,
			sender: 'uid',
			chat: 'cid'
		};
		createMessage = new CreateMessage(inputDTO, mockRepo);
	});
	it('Should save a private message', async () => {
		const result = await createMessage.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
