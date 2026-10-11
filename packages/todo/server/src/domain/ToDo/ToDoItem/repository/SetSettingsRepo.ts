import {SetSettingsDTO} from '../interactor/dto/SetSettingsDTO';

export interface SetSettingsRepo {
	update(inputDTO: SetSettingsDTO): Promise<void>;
}