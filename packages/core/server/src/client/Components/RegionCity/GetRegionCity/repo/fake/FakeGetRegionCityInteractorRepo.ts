import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';

export class FakeGetRegionCityInteractorRepo implements GetItem<GetRegionCityDTO> {
	load(id: string): Promise<GetRegionCityDTO> {
		return new Promise((resolve) => {
			resolve({
				'id': '9400d52b-a182-409e-b0f1-f732662bd895',
				'regionId': '38b3c439-00a4-414c-82f8-b7790a2754c8',
				'city': 'Banja Luka',
				'province': 'Republika Srpska',
				'provinceCode': 'RS001',
				'community': 'Lazarevo',
				'communityCode': 'LZR789',
				'postalCode': '78000',
				'latitude': 44.7722,
				'longitude': -17.1910
			});
		});
	}
}