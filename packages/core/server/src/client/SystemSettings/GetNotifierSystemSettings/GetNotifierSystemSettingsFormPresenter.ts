import {FormField} from '@copor/core/client/Core/Form/FormField';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {GetNotifierSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetNotifierSystemSettingsDTO';

export class GetNotifierSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetNotifierSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.NOTIFIER;
	}

	protected getFormFields(): FormField[] {
		return [
			new NotifierTitleField()
		];
	}
}

class NotifierTitleField extends FormField<string> {
	constructor() {
		super();
	}

	protected getCurrentValue(): FieldValueDTO<string> {
		return {text: ''};
	}

	protected getFieldType(): FormFieldType {
		return FormFieldType.HEADER;
	}

	protected getLabel(): string {
		return 'NOTIFIER_SETTINGS_FACILITY_NEWS_ARTICLES';
	}

	protected getName(): string {
		return 'NOTIFIER_SETTINGS_FACILITY_NEWS_ARTICLES';
	}
}