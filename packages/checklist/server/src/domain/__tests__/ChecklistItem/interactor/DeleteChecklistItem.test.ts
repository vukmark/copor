import {DeleteChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/DeleteChecklistItem';
import {DeleteChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/DeleteChecklistItemRepo';

describe('Test deleting checklist item', () => {
	let deleteChecklistItem: DeleteChecklistItem;
	let mockRepo: jest.Mocked<DeleteChecklistItemRepo>;

	beforeEach(() => {
		mockRepo = {
			delete: jest.fn()
		};
		deleteChecklistItem = new DeleteChecklistItem('unique-id', mockRepo);
	});

	it('Should delete checklist item', async () => {
		await deleteChecklistItem.execute();
		expect(mockRepo.delete).toHaveBeenCalledWith('unique-id');
	});
});