import {PresenterInstance} from '@copor/core/client/Core/Presenter/Presenter';
import i18next from 'i18next';
import {GetInfoViewModel} from '@copor/core/client/Core/Info/GetInfoViewModel';
import {InfoFieldDTO} from '@copor/core/client/Core/Info/InfoFieldDTO';
import {InfoField} from '@copor/core/client/Core/Info/InfoField';

export abstract class InfoPresenter<T> extends PresenterInstance<T, GetInfoViewModel> {
	present(): GetInfoViewModel {
		i18next.setDefaultNamespace('info');
		const fields: InfoFieldDTO[] = this.getInfoFields().map((field) => {
			return field.getField();
		});

		const logDataFields: InfoFieldDTO[] = this.getLogDataFields().map((field) => {
			return field.getField();
		});

		return {
			title: i18next.t('translationStringList.LOG_INFO'),
			fields: fields,
			logDataTitle: i18next.t('translationStringList.LOG_DATA'),
			logDataFields: logDataFields
		};
	}


	protected abstract getInfoFields(): InfoField[];
	protected abstract getLogDataFields(): InfoField[];
}