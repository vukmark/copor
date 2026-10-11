import {SaveLanguageRepo} from '@copor/core/domain/Components/Language/repository/SaveLanguageRepo';
import {SaveLanguageDTO} from '@copor/core/domain/Components/Language/interactor/dto/SaveLanguageDTO';

export class FakeUpdateLanguageInteractorRepo implements SaveLanguageRepo {
	save(saveDTO: SaveLanguageDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
