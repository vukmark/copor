import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCity} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCity';

describe('Test get region-city', () => {
	const mockRepo: jest.Mocked<GetItem<GetRegionCityDTO>> = {
		load: jest.fn()
	};

	const expectedResponse: GetRegionCityDTO = {
		id: 'uuid',
		city: 'city',
		community: 'community',
		communityCode: 'communityCode',
		latitude: 0,
		longitude: 0,
		postalCode: 'postalCode',
		province: 'province',
		provinceCode: 'provinceCode',
		regionId: 'regionId'
	};

	const getRegionCity = new GetRegionCity('uuid', mockRepo);

	it('Should return region-city based on provided id', async () => {
		mockRepo.load.mockResolvedValue(expectedResponse);

		expect(await getRegionCity.execute()).toEqual(expectedResponse);
	});
});