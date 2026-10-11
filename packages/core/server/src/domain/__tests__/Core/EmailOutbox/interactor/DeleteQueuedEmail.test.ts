import {DeleteQueuedEmail} from '@copor/core/domain/Core/EmailOutbox/interactor/DeleteQueuedEmail';
import {DeleteQueuedEmailRepo} from '@copor/core/domain/Core/EmailOutbox/repository/DeleteQueuedEmailRepo';

describe('Delete queued email', () => {
	const mockRepo: jest.Mocked<DeleteQueuedEmailRepo> = {
		delete: jest.fn()
	};
	const deleteEmail = new DeleteQueuedEmail('email-id', mockRepo);

	it('Should delete an email', async () => {
		await deleteEmail.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('email-id');
	});
});