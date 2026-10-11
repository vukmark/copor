import {FormField} from '@copor/core/client/Core/Form/FormField';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {GetTimeZoneSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetTimeZoneSystemSettingsDTO';
import {TimeZoneField} from '@copor/core/client/Core/Form/drop_down/TimeZoneField';
import {TimeZoneList} from '@copor/core/client/Core/Helpers/TimeZoneList';

export class GetTimeZoneSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetTimeZoneSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.TIME_ZONE;
	}

	protected getFormFields(): FormField[] {
		return [
			new TimeZoneSettingsTitleField(),
			new TimeZoneField({id: this.input.timeZone, name: this.input.timeZone}, TimeZoneList.get())
		];
	}
}

class TimeZoneSettingsTitleField extends FormField<string> {
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
		return 'TIME_ZONE_SETTINGS';
	}

	protected getName(): string {
		return 'TIME_ZONE_SETTINGS';
	}
}
