import {SaveRegionCityRepo} from '@copor/core/domain/Components/RegionCity/repository/SaveRegionCityRepo';
import {SaveRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/SaveRegionCityDTO';
import {UpdateRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/UpdateRegionCity';

describe('Update region-city tests', () => {
	let mockRepo: jest.Mocked<SaveRegionCityRepo>;
	let input: SaveRegionCityDTO;
	let updateRegionCity: UpdateRegionCity;

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
			latitude: 0,
			longitude: 0,
			province: 'province',
			provinceCode: 'provinceCode',
			regionId: 'regionId'
		};
		updateRegionCity = new UpdateRegionCity(input, mockRepo);
	});
	it('Should save data for update', async () => {
		await updateRegionCity.execute();
		expect(mockRepo.save).toHaveBeenCalledWith(input);
	});
});