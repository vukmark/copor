import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {GetRegionCityList} from '@copor/core/domain/Components/RegionCity/interactor/GetRegionCityList';

describe('Get region-city list test', () => {
	const mockRepo: jest.Mocked<ListItems<GetRegionCityDTO>> = {
		list: jest.fn()
	};
	const expectedResponse: GetRegionCityDTO[] = [
		{
			city: 'city',
			community: 'community',
			communityCode: 'communityCode',
			id: 'id',
			latitude: 0,
			longitude: 0,
			postalCode: 'postalCode',
			province: 'province',
			provinceCode: 'provinceCode',
			regionId: 'regionId'
		},
		{
			city: 'city',
			community: 'community',
			communityCode: 'communityCode',
			id: 'id',
			latitude: 0,
			longitude: 0,
			postalCode: 'postalCode',
			province: 'province',
			provinceCode: 'provinceCode',
			regionId: 'regionId'
		}
	];

	const getRegionCityList: GetRegionCityList = new GetRegionCityList([], mockRepo);

	it('Should list all region-city', async () => {
		mockRepo.list.mockResolvedValue(expectedResponse);
		expect(await getRegionCityList.execute()).toEqual(expectedResponse);
	});
});