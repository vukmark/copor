import {UpdateChecklistRepo} from '@copor/checklist/domain/Checklist/repository/UpdateChecklistRepo';
import {UpdateChecklist} from '@copor/checklist/domain/Checklist/interactor/UpdateChecklist';
import {SaveChecklistDTO} from '@copor/checklist/domain/Checklist/interactor/dto/SaveChecklistDTO';

describe('Test Edit checklist', () => {
	const mockRepo: jest.Mocked<UpdateChecklistRepo> = {
		update: jest.fn()
	};

	const input: SaveChecklistDTO = {
		id: 'id',
		title: 'title',
		actorId: 'actorId'
	};

	const editor = new UpdateChecklist(input, mockRepo);

	it('Should save edited data for checklist', async () => {
		await editor.execute();
		expect(mockRepo.update).toHaveBeenCalledWith(input);
	});
});