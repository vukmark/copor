import {GetRegionDTO} from '@copor/core/domain/Components/Region/interactor/dto/GetRegionDTO';
import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';


export class FakeGetRegionListInteractorRepo implements ListItems<GetRegionDTO> {
	public list(input: ListRepoInputDTO): Promise<GetRegionDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: '12345',
						country: {id: 'aaa', name: 'United States'},
						state: {id: 'bbb', name: 'California'},
						postalCode: '90001',
						cityList: ['Los Angeles']
					}
				]
			);
		});
	}
}
