import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';
import {UniqueIdGenerator} from '@copor/core/domain/Core/Repository/UniqueIdGenerator';

export class FakeCreateLanguageInteractorRepo implements SaveItem<SaveLanguageDTO>, UniqueIdGenerator {
	getNewId(): Promise<string> {
		return Promise.resolve('unique-id');
	}
	save(saveDTO: SaveLanguageDTO): Promise<void> {
		return Promise.resolve();
	}
}
