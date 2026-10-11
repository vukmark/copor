import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetLanguageListInteractorRepo implements ListItems<GetLanguageDTO> {
	public list(input: ListRepoInputDTO): Promise<GetLanguageDTO[]> {
		return new Promise((resolve) => {
			resolve(
				[{
					id: 'id',
					name: 'serbian',
					code: 'sr',
					nativeName: 'Srpski',
					publishStatus: PublishStatus.published
				}]
			);
		});
	}
}
