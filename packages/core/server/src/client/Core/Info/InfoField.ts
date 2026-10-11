import i18next from 'i18next';
import {InfoFieldDTO, InfoFieldValueDTO} from '@copor/core/client/Core/Info/InfoFieldDTO';
import {InfoFieldType} from '@copor/core/client/Core/Info/InfoFieldType';


export abstract class InfoField<T = unknown> {
	protected i18n;

	protected constructor() {
		this.i18n = i18next;
		this.i18n.setDefaultNamespace('log_type');
	}

	getField(): InfoFieldDTO {
		return {
			label: this.getTranslatedLabel(),
			value: this.getValue(),
			type: this.getFieldType()
		};
	}

	protected getTranslation(translationKey: string) : string {
		return this.i18n.t(`translationStringList.${translationKey}`);
	}

	private getTranslatedLabel() : string {
		return this.getTranslation(this.getLabel());
	}

	protected abstract getLabel() : string;
	protected abstract getValue() : InfoFieldValueDTO<T>;
	protected abstract getFieldType() : InfoFieldType;
}
