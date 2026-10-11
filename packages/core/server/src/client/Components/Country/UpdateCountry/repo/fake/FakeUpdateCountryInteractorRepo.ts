import {SaveCountryRepo} from '@copor/core/domain/Components/Country/repository/SaveCountryRepo';
import {SaveCountryDTO} from '@copor/core/domain/Components/Country/interactor/dto/SaveCountryDTO';

export class FakeUpdateCountryInteractorRepo implements SaveCountryRepo {
	save(saveDTO: SaveCountryDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
