import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';

export class FakeGetRegionInteractorRepo implements GetItem<GetRegionDTO> {
	load(id: string): Promise<GetRegionDTO> {
		return new Promise((resolve) => {
			resolve({
				id: '12345',
				country: {id: '11', name: 'USA'},
				state: {id: '11', name: 'California'},
				postalCode: '90210',
				cityList: ['Beverly Hills']
			}
			);
		});
	}
}
