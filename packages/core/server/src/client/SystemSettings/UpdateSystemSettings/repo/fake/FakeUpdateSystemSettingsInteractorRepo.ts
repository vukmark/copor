import {UpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/UpdateSystemSettingsRepo';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';

export class FakeUpdateSystemSettingsInteractorRepo<SettingsDTO> implements UpdateSystemSettingsRepo<SettingsDTO> {
	save(saveDTO: SaveSystemSettingsDTO<SettingsDTO>): Promise<void> {
		return Promise.resolve(undefined);
	}
}
