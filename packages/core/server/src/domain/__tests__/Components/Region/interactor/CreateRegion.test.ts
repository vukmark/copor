import {CreateRegion} from '@copor/core/domain/Components/Region/interactor/CreateRegion';
import {SaveRegionRepo} from '@copor/core/domain/Components/Region/repository/SaveRegionRepo';
import {SaveRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/SaveRegionDTO';

describe('Create region tests', () => {
	let createRegion: CreateRegion;
	let mockRepo: jest.Mocked<SaveRegionRepo>;
	let input: SaveRegionDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			actorId: 'user-id',
			country: '1',
			state: '1',
			postalCode: '34521'
		};
		createRegion = new CreateRegion(input, mockRepo);
	});

	it('Should save a region', async () => {
		const result = await createRegion.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});
