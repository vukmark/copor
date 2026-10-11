import {FormField} from '@copor/core/client/Core/Form/FormField';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {GetDisplaySystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetDisplaySystemSettingsDTO';
import {YesNoDropDownField} from '@copor/core/client/Core/Form/bool_inputs/YesNoDropDownField';

export class GetDisplaySystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetDisplaySystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.DISPLAY;
	}

	protected getFormFields(): FormField[] {
		return [
			new DisplayTitleField(),
			new ShowDetailedErrorsField(this.input.showDetailedErrors)
		];
	}
}

class DisplayTitleField extends FormField<string> {
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
		return 'DISPLAY_SETTINGS';
	}

	protected getName(): string {
		return 'DISPLAY_SETTINGS';
	}
}

class ShowDetailedErrorsField extends YesNoDropDownField {
	protected getLabel(): string {
		return 'SHOW_DETAILED_ERRORS';
	}

	protected getName(): string {
		return 'showDetailedErrors';
	}

	protected getRequiredMessage(): undefined {
		return undefined;
	}
}