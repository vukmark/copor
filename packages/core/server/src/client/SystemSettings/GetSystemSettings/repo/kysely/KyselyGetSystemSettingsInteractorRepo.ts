import {GetSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/GetSystemSettingsRepo';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';

export class KyselyGetSystemSettingsInteractorRepo<SettingsDTO> implements GetSystemSettingsRepo<SettingsDTO> {
	async load(type: SystemSettingsType): Promise<SettingsDTO> {
		return SystemSettingsFactory.getSettings<SettingsDTO>(type);
	}
}
