import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export interface SaveSystemSettingsDTO<SettingsDTO> {
	type: SystemSettingsType;
	settings: SettingsDTO
}