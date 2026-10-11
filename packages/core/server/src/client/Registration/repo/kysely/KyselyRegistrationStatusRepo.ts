import {RegistrationStatusRepo} from '@copor/core/domain/Registration/repository/RegistrationStatusRepo';
import {SystemSettingsFactory} from '@copor/core/client/SystemSettings/GetSystemSettings/SystemSettingsFactory';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetGlobalSystemSettingsDTO';

export class KyselyRegistrationStatusRepo implements RegistrationStatusRepo {
	public async isSelfRegistrationEnabled(): Promise<boolean> {
		try {
			const settings = await SystemSettingsFactory.getSettings<GetGlobalSystemSettingsDTO>(SystemSettingsType.GLOBAL);

			return settings.allowSelfRegistration === true;
		} catch {
			// Unreadable settings: fail closed.
			return false;
		}
	}
}
