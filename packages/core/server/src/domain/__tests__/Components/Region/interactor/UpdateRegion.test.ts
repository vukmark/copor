import {SaveRegionRepo} from '@copor/core/domain/Components/Region/repository/SaveRegionRepo';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';
import {UpdateRegion} from '@copor/core/domain/Components/Region/interactor/UpdateRegion';

describe('Update region tests', () => {
	let mockRepo: jest.Mocked<SaveRegionRepo>;
	let input: SaveRegionDTO;
	let updateRegion: UpdateRegion;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			actorId: 'actorId',
			country: 'country',
			postalCode: 'postalCode',
			state: 'state'
		};
		updateRegion = new UpdateRegion(input, mockRepo);
	});
	it('Should save data for update', async () => {
		await updateRegion.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
