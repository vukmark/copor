import {FormField} from '@copor/core/client/Core/Form/FormField';
import {NameField} from '@copor/core/client/Core/Form/text_inputs/NameField';
import {GetGlobalSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetGlobalSystemSettingsDTO';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {PostalCodeField} from '@copor/core/client/Core/Form/text_inputs/PostalCodeField';
import {AllowSelfRegistrationField} from '@copor/core/client/Core/Form/bool_inputs/AllowSelfRegistrationField';

export class GetGlobalSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetGlobalSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.GLOBAL;
	}

	protected getFormFields(): FormField[] {
		return [
			new OrganizationMasterDataTitleField(),
			new NameField(this.input.name),
			new PostalCodeField(this.input.postalCode),
			new AllowSelfRegistrationField(this.input.allowSelfRegistration === true)
		];
	}
}

class OrganizationMasterDataTitleField extends FormField<string> {
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
		return 'ORGANIZATION_MASTER_DATA';
	}

	protected getName(): string {
		return 'ORGANIZATION_MASTER_DATA';
	}
}