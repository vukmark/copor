import {CreateChecklist} from '@copor/checklist/domain/Checklist/interactor/CreateChecklist';
import {SaveChecklistRepo} from '@copor/checklist/domain/Checklist/repository/SaveChecklistRepo';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';

describe('Test create new checklist', () => {
	let checklist: CreateChecklist;
	let mockRepo: jest.Mocked<SaveChecklistRepo>;
	let input: SaveChecklistDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			title: 'some-checklist-title',
			actorId: 'creator-id'
		};
		checklist = new CreateChecklist(input, mockRepo);
	});

	it('Should save new checklist', async () => {
		const result = await checklist.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});