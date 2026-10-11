import {CreateQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/interactor/CreateQueuedEmail';
import {CreateQueuedEmailRepo} from '@copor/core/domain/Core/EmailOutbox/repository/CreateQueuedEmailRepo';
import {SaveQueuedEmailDTO} from '@copor/core/domain/Core/EmailOutbox/interactor/dto/SaveQueuedEmailDTO';

describe('queue email tests', () => {
	let queueEmail: CreateQueuedEmail;
	let mockRepo: jest.Mocked<CreateQueuedEmailRepo>;
	let inputDTO: SaveQueuedEmailDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		inputDTO = {
			id: 'unique-id',
			type: 'name',
			receiver: 'NM',
			subject: 'some-id',
			payload: 'j',
			actorId: 'actor-id'
		};
		queueEmail = new CreateQueuedEmail(inputDTO, mockRepo);
	});

	it('should queue an email', async() => {
		const result = await queueEmail.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(inputDTO);
	});
});
