import {FormField} from '@copor/core/client/Core/Form/FormField';
import {SystemSettingsType} from '@copor/core/domain/SystemSettings/interactor/dto/SystemSettingsListDTO';
import {GetSystemSettingsFormPresenter} from '@copor/core/client/SystemSettings/GetSystemSettingsFormPresenter';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';
import {GetWorkflowSystemSettingsDTO} from '@copor/core/domain/SystemSettings/interactor/dto/GetWorkflowSystemSettingsDTO';

export class GetWorkflowSystemSettingsFormPresenter extends GetSystemSettingsFormPresenter<GetWorkflowSystemSettingsDTO> {
	getSystemSettingsType(): SystemSettingsType {
		return SystemSettingsType.WORKFLOW;
	}

	protected getFormFields(): FormField[] {
		return [
			new WorkflowTitleField()
		];
	}
}

class WorkflowTitleField extends FormField<string> {
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
		return 'SYSTEM_SETTINGS_WORKFLOW_TITLE';
	}

	protected getName(): string {
		return 'SYSTEM_SETTINGS_WORKFLOW_TITLE';
	}
}
