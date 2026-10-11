import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/GetCountryDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetCountryListInteractorRepo implements ListItems<GetCountryDTO> {
	public list(input: ListRepoInputDTO): Promise<GetCountryDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: 'id1',
						name: 'Germany',
						code: 'DE',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id2',
						name: 'Sweden',
						code: 'SE',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id3',
						name: 'France',
						code: 'FR',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id4',
						name: 'Italy',
						code: 'IT',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id5',
						name: 'Spain',
						code: 'ES',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id6',
						name: 'Netherlands',
						code: 'NL',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id7',
						name: 'Norway',
						code: 'NO',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id8',
						name: 'Finland',
						code: 'FI',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id9',
						name: 'Poland',
						code: 'PL',
						publishStatus: PublishStatus.unpublished
					},
					{
						id: 'id10',
						name: 'Austria',
						code: 'AT',
						publishStatus: PublishStatus.unpublished
					}
				]

			);
		});
	}
}
