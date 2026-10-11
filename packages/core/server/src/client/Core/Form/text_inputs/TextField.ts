import {FormField} from '@copor/core/client/Core/Form/FormField';
import {FormFieldType} from '@copor/core/client/Core/Form/FormFieldType';
import {FieldValueDTO} from '@copor/core/client/Core/Form/FormFieldDTO';

export abstract class TextField extends FormField {
	protected currentValue: string;
	protected isEnabled?: boolean;

	constructor(currentValue: string | undefined, isEnabled?: boolean | undefined) {
		super();
		this.currentValue = currentValue ?? '';
		this.isEnabled = isEnabled ?? true;
	}

	protected getFieldType(): FormFieldType {
		if (!this.isEnabled) {
			return FormFieldType.DISABLED_TEXT;
		}

		return FormFieldType.TEXT;
	}

	protected getCurrentValue(): FieldValueDTO {
		return {text: this.currentValue};
	}
}