import {SaveUserPreferencesRepo} from '@copor/core/domain/User/UserPreferences/repository/SaveUserPreferencesRepo';
import {SaveUserPreferencesDTO} from '@copor/core/domain/User/UserPreferences/interactor/dto/SaveUserPreferencesDTO';

export class FakeUpdateUserPreferencesInteractorRepo implements SaveUserPreferencesRepo {
	save(saveDTO: SaveUserPreferencesDTO): Promise<void> {
		return Promise.resolve(undefined);
	}
}
