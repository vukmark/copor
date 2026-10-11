import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetRegionCityDTO} from '@copor/core/domain/Components/RegionCity/interactor/dto/GetRegionCityDTO';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetRegionCityListInteractorRepo implements ListItems<GetRegionCityDTO> {
	public list(input: ListRepoInputDTO): Promise<GetRegionCityDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: 'rc_12345',
						regionId: 'reg_67890',
						city: 'Banja Luka',
						province: 'Banja Luka',
						provinceCode: 'BL',
						community: 'Centar',
						communityCode: 'BL-CEN',
						postalCode: '78000',
						latitude: 44.7722,
						longitude: 17.1910
					}
				]
			);
		});
	}
}