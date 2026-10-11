import {CreateRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/CreateRegionCity';
import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';

describe('Create region-city tests', () => {
	let createRegionCity: CreateRegionCity;
	let mockRepo: jest.Mocked<SaveRegionCityRepo>;
	let input: SaveRegionCityDTO;

	beforeEach(() => {
		mockRepo = {
			save: jest.fn()
		};
		input = {
			id: 'unique-id',
			actorId: 'actorId',
			city: 'city',
			community: 'community',
			communityCode: 'communityCode',
			latitude: -90.00,
			longitude: 180.00,
			province: 'province',
			provinceCode: 'provinceCode',
			regionId: 'regionId'
		};
		createRegionCity = new CreateRegionCity(input, mockRepo);
	});

	it('Should save a region-city', async () => {
		const result = await createRegionCity.execute();

		expect(result).toEqual('unique-id');
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});