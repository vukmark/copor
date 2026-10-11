import {SaveNativeLanguageRepo} from '@copor/core/domain/Components/NativeLanguage/repository/SaveNativeLanguageRepo';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';

export class FakeUpdateNativeLanguageInteractorRepo implements SaveNativeLanguageRepo {
	save(saveDTO: SaveNativeLanguageDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
