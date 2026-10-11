import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';
import {UpdateChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/UpdateChecklistItem';
import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';

describe('Test edit checklist item', () => {
	const mockRepo: jest.Mocked<SaveChecklistItemRepo> = {
		save: jest.fn()
	};

	const input: SaveChecklistItemDTO = {
		id: 'item-id',
		description: 'desc',
		isChecked: true,
		actorId: 'creator-id',
		checklistId: 'checklistId'
	};

	const editChecklistItem = new UpdateChecklistItem(input, mockRepo);

	it('Should save edited data for checklist item', async () => {
		await editChecklistItem.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});