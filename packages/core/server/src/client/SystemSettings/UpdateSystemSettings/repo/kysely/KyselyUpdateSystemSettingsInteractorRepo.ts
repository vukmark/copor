import {UpdateSystemSettingsRepo} from '@copor/core/domain/SystemSettings/repository/UpdateSystemSettingsRepo';
import {writeFile} from 'node:fs/promises';
import {SystemFileHelper} from '@copor/core/client/Core/Helpers/SystemFileHelper';
import {SaveSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveSystemSettingsDTO';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {AppTimeZoneStore} from '@copor/core/client/Core/Helpers/AppTimeZoneStore';
import {SaveTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/SaveTimeZoneSystemSettingsDTO';

export class KyselyUpdateSystemSettingsInteractorRepo<SettingsDTO> implements UpdateSystemSettingsRepo<SettingsDTO> {
	async save(saveDTO: SaveSystemSettingsDTO<SettingsDTO>): Promise<void> {
		try {
			await writeFile(
				SystemFileHelper.settingsPath(saveDTO.type),
				JSON.stringify(saveDTO.settings, null, 2),
				'utf-8'
			);
		} catch (err) {
			throw new Error('Failed to save system settings');
		}

		if (saveDTO.type === SystemSettingsType.TIME_ZONE) {
			const timeZoneSettings = saveDTO.settings as unknown as SaveTimeZoneSystemSettingsDTO;

			AppTimeZoneStore.set(timeZoneSettings.timeZone);
		}
	}
}

