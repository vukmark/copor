import {DeleteChecklist} from '@copor/checklist/domain/Checklist/interactor/DeleteChecklist';
import {DeleteChecklistRepo} from '@copor/checklist/domain/Checklist/repository/DeleteChecklistRepo';

describe('Test deleting checklist', () => {
	let deleteChecklist: DeleteChecklist;
	let mockRepo: jest.Mocked<DeleteChecklistRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteChecklist = new DeleteChecklist('unique-id', mockRepo);
	});

	it('should delete todo', async () => {
		await deleteChecklist.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});