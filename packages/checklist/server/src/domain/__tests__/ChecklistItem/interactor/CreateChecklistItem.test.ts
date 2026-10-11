import {SaveChecklistItemRepo} from '@copor/checklist/domain/ChecklistItem/repository/SaveChecklistItemRepo';
import {CreateChecklistItem} from '@copor/checklist/domain/ChecklistItem/interactor/CreateChecklistItem';
import {SaveChecklistItemDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistItemDTO';

describe('Test create new checklist item', () => {
	let checklistItem: CreateChecklistItem;
	let mockChecklistItemRepo: jest.Mocked<SaveChecklistItemRepo>;
	let input: SaveChecklistItemDTO;

	beforeEach(() => {
		mockChecklistItemRepo = {
			save: jest.fn()
		};
		input = {
			id: 'id',
			checklistId: 'checklistId',
			description: 'description',
			actorId: 'actorId',
			isChecked: true
		};
		checklistItem = new CreateChecklistItem(input, mockChecklistItemRepo);
	});

	it('Should save new checklist item', async () => {
		const result = await checklistItem.execute();

		expect(result).toEqual('id');
		expect(mockChecklistItemRepo.save).toHaveBeenCalledWith(input);
	});
});