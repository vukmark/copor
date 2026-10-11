import {GetItem} from '@copor/core/domain/Core/Repository/GetItem';
import {GetNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/GetNativeLanguageDTO';
import {PublishStatus} from '@copor/core/domain/Core/enum/PublishStatus';

export class FakeGetNativeLanguageInteractorRepo implements GetItem<GetNativeLanguageDTO> {
	load(id: string): Promise<GetNativeLanguageDTO> {
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
