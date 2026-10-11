import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetStateDTO} from '@copor/core/domain/Components/State/interactor/dto/GetStateDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetStateTableListInteractorRepo implements ListItems<GetStateDTO> {
	public list(input: ListRepoInputDTO): Promise<GetStateDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[
					{
						id: 'id-1',
						name: 'Brandenburg',
						code: 'BB',
						countryId: 'countryId',
						publishStatus: PublishStatus.published
					},
					{
						id: 'id-2',
						name: 'Bavaria',
						code: 'BY',
						countryId: 'countryId',
						publishStatus: PublishStatus.published
					}
				]
			);
		});
	}
}
