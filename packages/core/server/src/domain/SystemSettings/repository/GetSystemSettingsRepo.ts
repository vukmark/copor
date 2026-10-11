import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export interface GetSystemSettingsRepo<SettingsDTO> {
	load(type: SystemSettingsType): Promise<SettingsDTO>;
}