import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/GetLanguageDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetLanguageInteractorRepo implements GetItem<GetLanguageDTO> {
	load(id: string): Promise<GetLanguageDTO> {
		return new Promise((resolve) => {
			resolve(
				{
					id: 'id',
					name: 'serbian',
					code: 'sr',
					nativeName: 'Srpski',
					publishStatus: PublishStatus.published
				}
			);
		});
	}
}
