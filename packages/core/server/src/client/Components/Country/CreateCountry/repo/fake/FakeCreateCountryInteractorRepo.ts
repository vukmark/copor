import {SaveItem} from '@copor/core/domain/Core/Repository/SaveItem';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';

export class FakeCreateCountryInteractorRepo implements SaveItem<SaveCountryDTO> {
	save(saveDTO: SaveCountryDTO): Promise<void> {
		return Promise.resolve();
	}
}
