import {ListItems} from '@copor/core/domain/Core/Repository/ListItems';
import {SystemSettingsListDTO, SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import i18next from 'i18next';

export class KyselyGetSystemSettingsListInteractorRepo implements ListItems<SystemSettingsListDTO> {
	public async list(): Promise<SystemSettingsListDTO[]> {
		i18next.setDefaultNamespace('system_settings');
		return Promise.resolve([
			{
				type: i18next.t('translationStringList.SMTP'),
				url: SystemSettingsType.SMTP
			},
			{
				type: i18next.t('translationStringList.SMTP_TEST'),
				url: SystemSettingsType.SMTP_TEST
			},
			{
				type: i18next.t('translationStringList.GLOBAL'),
				url: SystemSettingsType.GLOBAL
			},
			{
				type: i18next.t('translationStringList.DISPLAY'),
				url: SystemSettingsType.DISPLAY
			},
			{
				type: i18next.t('translationStringList.WORKFLOW'),
				url: SystemSettingsType.WORKFLOW
			},
			{
				type: i18next.t('translationStringList.NOTIFIER'),
				url: SystemSettingsType.NOTIFIER
			},
			{
				type: i18next.t('translationStringList.PASSWORD'),
				url: SystemSettingsType.PASSWORD
			},
			{
				type: i18next.t('translationStringList.TIME_ZONE'),
				url: SystemSettingsType.TIME_ZONE
			}
		]);
	}
}
