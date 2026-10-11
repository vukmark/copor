import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveNativeLanguageDTO} from '@copor/core/domain/Components/NativeLanguage/interactor/dto/SaveNativeLanguageDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateNativeLanguageInteractorRepo implements SaveItem<SaveNativeLanguageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveNativeLanguageDTO): Promise<void> {
		return Promise.resolve();
	}
}
