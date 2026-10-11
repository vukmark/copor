import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {GetFilterDTO} from '@copor/core/domain/Core/global/Filter/dto/GetFilterDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';
import {ListRepoInputDTO} from '@copor/core/domain/Core/Interactors/ListItemsUseCase';

export class FakeGetNativeLanguageListInteractorRepo implements ListItems<GetNativeLanguageDTO> {
	public list(input: ListRepoInputDTO): Promise<GetNativeLanguageDTO[]> {
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
