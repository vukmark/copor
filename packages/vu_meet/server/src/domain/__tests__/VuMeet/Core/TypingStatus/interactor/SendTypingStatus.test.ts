import {SendTypingStatus} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/SendTypingStatus';
import {SendTypingStatusRepo} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/repository/SendTypingStatusRepo';
import {SendTypingStatusDTO} from '@copor/vu_meet/domain/VuMeet/Core/TypingStatus/interactor/dto/SendTypingStatusDTO';
import {TypingStatus} from '@copor/core/domain/Core/enum/TypingStatus';

describe('send typing status interactor tests', () => {
	let mockRepo: jest.Mocked<SendTypingStatusRepo>;
	const input: SendTypingStatusDTO = {
		userId: 'uid',
		chatId: 'cid',
		status: TypingStatus.STARTED_TYPING
	};
	let sendTypingStatus: SendTypingStatus;

	beforeEach(() => {
		mockRepo = {
			send: jest.fn()
		};
		sendTypingStatus = new SendTypingStatus(input, mockRepo);
	});
	it('should send typing status', async () => {
		await sendTypingStatus.execute();
		expect(mockRepo.send).toHaveBeenCalledWith(input);
	});
});
